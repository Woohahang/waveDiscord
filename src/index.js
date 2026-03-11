const fs = require('node:fs');
const path = require('node:path');
require('module-alias/register');
require('dotenv').config();
const { Collection } = require('discord.js');
const logger = require('@utils/logger');
const connectMongoDB = require('./mongoDB/connectMongoDB.js');
const token = process.env.TEST_DISCORD_TOKEN;
const createClient = require('./app/bootstrap/createClient.js')

const client = createClient();

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

const commandsRootPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsRootPath);
client.commands = new Collection();

commandFolders.forEach(folder => {
    const folderPath = path.join(commandsRootPath, folder);
    const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

    commandFiles.forEach(file => {
        const filePath = path.join(folderPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command)
            client.commands.set(command.data.name, command);
        else
            logger.warn(`[index] ${filePath} 명령어 파일의 필수 속성 "data" 또는 "execute"가 없습니다.`);
    })
})

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