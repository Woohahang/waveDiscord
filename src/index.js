// index.js

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { testtoken } = require('../../config.json');
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


const { handleGuildCreate } = require('./handlers/guildCreate');
const { handleinteraction } = require('./handlers/interaction');
const { handleVoiceStateUpdate } = require('./handlers/voiceStateUpdate');

client.on(Events.GuildCreate, async guild => {
    handleGuildCreate(guild);
});

client.on(Events.InteractionCreate, async interaction => {
    handleinteraction(interaction);
});

client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
    handleVoiceStateUpdate(oldState, newState);
});


client.login(testtoken);