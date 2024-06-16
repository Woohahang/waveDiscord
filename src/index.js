// index.js

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { testtoken } = require('../../config.json');
const connectToDatabase = require('./mongoDB/database.js');

const { handleGuildCreate } = require('./handlers/guildCreate');
const { handleinteraction } = require('./handlers/interaction');
const { handleVoiceStateUpdate } = require('./handlers/voiceStateUpdate');
const handleGuildMemberUpdate = require('./handlers/guildMemberUpdate');


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
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

// client.on(Events.GuildMemberUpdate, async (oldMember, newMember) => {

//     console.log('test');

//     handleGuildMemberUpdate(oldMember, newMember);
// });



client.login(testtoken);