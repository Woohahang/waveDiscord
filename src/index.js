// index.js

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, TextInputBuilder, ActionRowBuilder, ModalBuilder, EmbedBuilder } = require('discord.js');
const { token } = require('../../config.json');
const connectToDatabase = require('./database.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] });

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

const saveNickname = require('./events/saveNickname.js');
const voiceJoin = require('./events/voiceJoinMessage.js');
const { channel } = require('node:diagnostics_channel');

// MongoDB 연결
connectToDatabase();

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

// 메뉴 선택 했을 때만 작동한다.
client.on('interactionCreate', async interaction => {

    if (!interaction.isMessageComponent()) return;
    console.log("메뉴 선택 객체");

    try {
        saveNickname(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: '상호 작용 처리 중 오류가 발생했습니다!', ephemeral: true });
        } else {
            await interaction.reply({ content: '상호 작용 처리 중 오류가 발생했습니다!', ephemeral: true });
        }
    }

})

// 전송 버튼 눌렀을 때만 작동한다.
client.on('interactionCreate', async interaction => {
    if (!interaction.isModalSubmit()) return;
    console.log("전송 객체");

    try {
        saveNickname(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: '전송 처리 중 오류가 발생했습니다!', ephemeral: true });
        } else {
            await interaction.reply({ content: '전송 처리 중 오류가 발생했습니다!', ephemeral: true });
        }
    }
})

// 음성 채널 입장시 작동
client.on('voiceStateUpdate', async (oldState, newState) => { //
    if (oldState.channelId !== newState.channelId && newState.channelId !== null) {  // 채널 타입이 2(길드 채널)이라면 true, newState.channel 음성 채널에 입장하면 true
        voiceJoin(oldState, newState);
    }
})


client.login(token);