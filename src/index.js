// index.js

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token, clientId } = require('../../config.json');
const connectToDatabase = require('./database.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
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
const saveNickname = require('./events/saveNickname.js');
const voiceJoin = require('./events/voiceJoinMessage.js');
const removeNickname = require('./events/removeNickname.js');
const createGuideChannel = require('./events/createGuideChannel.js');

// 권한 모듈
const { checkAdminPermissionOnGuild, checkAdminPermissionOnVoice } = require('./module/checkAdminPermissionOnGuild.js');

// 길드 초대 메시지
const guildInviteMessage = require('./events/guildInviteMessage.js');


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
}

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// 가이드 채널 생성
client.on('guildCreate', async guild => {

    if (checkAdminPermissionOnGuild(clientId, guild)) { // Wave 가 관리자 권한 받았는지 체크
        try {
            createGuideChannel(guild); // 받았다면 가이드 채널 생성 !
        } catch (error) {
            console.error(error);
        }
    } else {
        guildInviteMessage(guild); // 관리자 권한을 못 받았다면 DM 전송
    }

});

// 음성 채널 입장시 작동
client.on('voiceStateUpdate', async (oldState, newState) => { //
    // Wave 가 관리자 권한이 없다면 리턴
    if (!checkAdminPermissionOnVoice(clientId, newState) || !checkAdminPermissionOnVoice(clientId, oldState)) return;

    if (oldState.channelId !== newState.channelId && newState.channelId !== null) {  // 채널 타입이 2(길드 채널)이라면 true, newState.channel 음성 채널에 입장하면 true
        voiceJoin(oldState, newState);
    }

})

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

// 클릭 메서드
client.on('interactionCreate', async interaction => {
    if (!interaction.isMessageComponent()) return;

    try {
        switch (interaction.customId) {
            case 'gameMenu':
                saveNickname(interaction);
                break;

            case 'removeNickNames':
                removeNickname(interaction);
                break;

            case 'removeButton':
                const command = await interaction.client.commands.get('닉네임삭제')
                await command.execute(interaction);
                break;

            default:
                console.log('isMessageComponent 에서 알 수 없는 customId : ' + interaction.customId)
        }
    } catch (error) {
        console.error('isMessageComponent 에서 Interaction 처리 중 오류 발생:', error);
        await interaction.reply({ content: '상호 작용 처리 중 오류가 발생했습니다!', ephemeral: true });
    }
})

// isModalSubmit 동작 메서드
client.on('interactionCreate', async interaction => {
    if (!interaction.isModalSubmit()) return;

    try {
        switch (interaction.customId) {
            case 'steamCode':
            case 'kaKaoName':
            case 'riotGamesName':
                saveNickname(interaction);
                console.log('customId 가 ' + interaction.customId + ' 입니다.');
                break;

            default:
                console.log('isModalSubmit 에서 알 수 없는 customId : ' + interaction.customId);
                break;
        }

    } catch (error) {
        console.error('isModalSubmit 에서 Interaction 처리 중 오류 발생:', error);
        await interaction.reply({ content: '상호 작용 처리 중 오류가 발생했습니다!', ephemeral: true });
    }
})








// 서버 입장 채널 테스트
// client.on('messageCreate', async message => {
//     if (message.member.id === '282793473462239232' && message.content === "1") {

//         const userIdToCheck = '1227561479801409566'; // 권한을 확인하고자 하는 사용자의 ID
//         const memberToCheck = message.guild.members.cache.get(userIdToCheck);
//         if (memberToCheck) {
//             console.log(memberToCheck.permissions);
//         } else {
//             console.log(`사용자 ${userIdToCheck}를 찾을 수 없습니다.`);
//         }

//     }
// });









client.login(token);