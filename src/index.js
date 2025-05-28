const fs = require('node:fs');
const path = require('node:path');
require('module-alias/register');
require('dotenv').config();
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const logger = require('@utils/logger');
const connectMongoDB = require('./mongoDB/connectMongoDB.js');

const token = process.env.DISCORD_TOKEN;

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

// MongoDB 연결
(async () => {
    try {
        await connectMongoDB();
    } catch (error) {
        logger.error('[index] MongoDB 연결 실패', {
            stack: error.stack
        });
        process.exit(1);
    }
})();


client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

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

/*테스트 코드*/
// const commandPath = path.join(__dirname, 'commands');
// const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));
/*테스트 코드*/


const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

eventFiles.forEach(file => {
    const event = require(`@events/${file}`);
    if (event.once)
        client.once(event.name, (...args) => event.execute(...args));
    else
        client.on(event.name, (...args) => event.execute(...args));
});

client.login(token);