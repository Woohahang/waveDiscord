// index.js

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { testtoken, clientId } = require('../../config.json');
const connectToDatabase = require('./mongoDB/database.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        // GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
    ]
});

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// MongoDB 연결
connectToDatabase();

// 이벤트 핸들러 모듈 가져오기
const saveNickname = require('./userManagement/saveNickname.js');
const removeNickname = require('./userManagement/removeNickname.js');
const createGuideChannel = require('./adminManagement/createGuideChannel.js');
const submitNicknameHandler = require('./userManagement/submitNicknameHandler.js');

// 권한 모듈
const { checkAdminPermissionOnGuild, checkAdminPermissionOnVoice } = require('./module/checkAdminPermissionOnGuild.js');

// 길드 모듈
const guildInviteMessage = require('./adminManagement/guildInviteMessage.js');
const adminChannel = require('./adminManagement/adminChannel.js');

const upDateButton = require('./adminManagement/upDateButton.js');

// 커맨드 파일 읽기
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
};

// 슬래시 커맨더만 작동한다.
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return; // 상호작용이 채팅 입력 명령어에 해당 하는지 체크. -> SlashCommandBuilder 를 체크

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) { // 상호작용에서 받은 명령어 이름을 사용하여 해당 명령어가 클라이언트의 명령어 콜렉션에 있는지 확인
        console.error(`${interaction.commandName} 의 일치하는 명령어를 찾을 수 없습니다.`);
        return; // 못 찾았으니 리턴하라
    }

    try {
        await command.execute(interaction); // execute 메서드는 명령어 객체에 속한 메서드로, 사용자가 명령어를 실행했을 때 실행되는 함수입니다. 이 메서드는 명령어의 동작을 정의하고, 해당 동작을 실행합니다.
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: '이 명령을 실행하는 동안 오류가 발생했습니다!', ephemeral: true });
        } else {
            await interaction.reply({ content: '이 명령을 실행하는 동안 오류가 발생했습니다!', ephemeral: true });
        }
    }
});


client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// 가이드 채널 생성
client.on(Events.GuildCreate, async guild => {

    if (checkAdminPermissionOnGuild(clientId, guild)) { // Wave 가 관리자 권한 받았는지 체크
        try {
            createGuideChannel(guild); // 받았다면 가이드 채널 생성 !
            adminChannel(guild);
        } catch (error) {
            console.error(error);
        }
    } else {
        guildInviteMessage(guild); // 관리자 권한을 못 받았다면 DM 전송
    }

});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isButton()) return;

    try {
        switch (interaction.customId) {
            case 'upDate':
                upDateButton(interaction);
                break;

            case 'removeButton':
                const command = await interaction.client.commands.get('닉네임삭제')
                await command.execute(interaction);
                break;

            default:
                console.log('isButton 에서 알 수 없는 customId : ' + interaction.customId);
        }

    } catch (error) {
        console.error('isButton 에서 Interaction 처리 중 오류 발생:', error);
        await interaction.reply({ content: '상호 작용 처리 중 오류가 발생했습니다!', ephemeral: true });
    }

});


// 구현 완료
const { toggleMenuHandler } = require('./adminManagement/toggleMenuHandler.js');

const { gameMenuToggle } = require('./adminManagement/gameMenuToggle.js');


// 메뉴 처리
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isStringSelectMenu()) return;

    const value = interaction.values[0];

    try {
        switch (interaction.customId) {
            case 'gameMenu':
                await saveNickname(interaction); // 결과에 따라 처리해야 되기 때문에 awiat 필요. 
                break;

            case 'removeNickNames':
                removeNickname(interaction);
                break;

            case 'adminMenuId':
                if (value === 'changeOrderValue') {
                    interaction.reply({ content: '개발 단계입니다.', ephemeral: true })
                } else { gameMenuToggle(interaction, value); }
                break;

            case 'hideMenuHandler':
                toggleMenuHandler(interaction, 'hideMenu');
                break;

            case 'showMenuHandler':
                toggleMenuHandler(interaction, 'showMenu');
                break;

            default:
                console.log('isMessageComponent 에서 알 수 없는 customId : ' + interaction.customId);
        }
    } catch (error) {
        console.error('isMessageComponent 에서 Interaction 처리 중 오류 발생:', error);
        await interaction.reply({ content: '상호 작용 처리 중 오류가 발생했습니다!', ephemeral: true });
    }
});

// 모달 처리
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isModalSubmit()) return;


    try {
        // customId에서 '-'를 기준으로 분리하고, 마지막 요소를 가져옵니다.
        const customIdParts = interaction.customId.split('-');
        const lastPart = customIdParts[customIdParts.length - 1];

        switch (lastPart) {
            case 'submitNickname':
                submitNicknameHandler(interaction);
        }

    } catch (error) {
        console.error('isModalSubmit 에서 Interaction 처리 중 오류 발생:', error);
        await interaction.reply({ content: '상호 작용 처리 중 오류가 발생했습니다!', ephemeral: true });
    }
});


// 단순이 id 만 담을 용도라 Map() 사용, discord.js 의 함수나 객체를 담을 때는 Collection() 쓸 예정
const voiceJoin = require('./userManagement/voiceJoinMessage.js');
const voiceExit = require('./userManagement/voiceExit.js');
const userMessageId = new Map();

// 음성 채널 처리
client.on(Events.VoiceStateUpdate, async (oldState, newState) => {

    // 사용자가 음성 채널에 들어온 경우
    if (!oldState.channel && newState.channel) {
        try {
            const messageId = await voiceJoin(newState);
            userMessageId.set(newState.id, messageId);
        } catch (error) {
            console.error('voiceJoin error:', error);
        }
    }

    // 사용자가 음성 채널에서 나간 경우
    else if (oldState.channel && !newState.channel) {
        try {
            const messageId = userMessageId.get(oldState.id);
            if (messageId) {
                voiceExit(oldState, messageId);
                userMessageId.delete(oldState.id);
            }
        } catch (error) {
            console.error('voiceExit error:', error);
        }
    }
});


client.login(testtoken);