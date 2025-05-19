require('module-alias/register');

const fs = require('node:fs');
const path = require('node:path');

const cron = require('node-cron');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

const { token } = require('../../config.json');
const connectToDatabase = require('./mongoDB/database.js');

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

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

eventFiles.forEach(file => {
    const event = require(`@events/${file}`);
    if (event.once)
        client.once(event.name, (...args) => event.execute(...args));
    else
        client.on(event.name, (...args) => event.execute(...args));
});




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

const autoUpdateTiers = require('./modules/autoUpdate/autoUpdateTiers.js');

// 10분마다 실행되는 크론 잡 설정 (매 10분 0초에 실행)
cron.schedule('*/10 * * * *', async () => {
    await autoUpdateTiers();
});

client.login(token);