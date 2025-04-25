require('module-alias/register');
const cron = require('node-cron');
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('../../config.json');
const connectToDatabase = require('./mongoDB/database.js');


const handleGuildCreate = require('./handlers/guildCreate');
const handleinteraction = require('./handlers/interaction');
const handleVoiceStateUpdate = require('./handlers/voiceStateUpdate');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildEmojisAndStickers, // 이모지 스티커와 관련 인텐트입니다.
        GatewayIntentBits.GuildMessageReactions, // 반응을 감지하는 인텐트입니다.
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
        };
    };
};

client.once(Events.ClientReady, readyClient => {
    // 봇이 시작된 시각을 저장합니다.
    client.startTime = new Date();

    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.GuildCreate, async guild => {
    handleGuildCreate(guild);
});

client.on(Events.InteractionCreate, async interaction => {
    handleinteraction(interaction);
});

client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
    handleVoiceStateUpdate(oldState, newState);
});

const updateLoLTiersJob = require('./events/ranking/updateLoLTiers.js');

// 10분마다 실행되는 크론 잡 설정 (매 10분 0초에 실행)
cron.schedule('*/10 * * * *', async () => {
    console.log('[⏰] 롤 티어 자동 업데이트 실행');
    await updateLoLTiersJob();
});

client.login(token);