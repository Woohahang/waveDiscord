require('module-alias/register');

const { REST, Routes } = require('discord.js');
const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.DISCORD_TOKEN;
const fs = require('node:fs');
const path = require('node:path');

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

const developerCommands = [];
const userCommands = [];

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            if (folder === 'developerCommands') {
                developerCommands.push(command.data.toJSON());
            } else if (folder === 'userCommands') {
                userCommands.push(command.data.toJSON());
            }
        } else {
            console.log(`[WARNING] ${filePath}에 있는 명령어가 필수 "data" 또는 "execute" 속성이 누락되었습니다.`);
        }
    }
}

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`시작합니다: ${developerCommands.length}개의 개발자 (/commands) 명령어와 ${userCommands.length}개의 사용자 (/commands) 명령어를 새로 고치고 있습니다.`);

        // 개발자 명령어 등록
        const developerData = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: developerCommands },
        );

        console.log(`성공적으로 ${developerData.length}개의 개발자 (/commands) 명령어를 다시 로드했습니다.`);

        // 사용자 명령어 등록 (글로벌)
        const userData = await rest.put(
            Routes.applicationCommands(clientId),
            { body: userCommands },
        );

        console.log(`성공적으로 ${userData.length}개의 사용자 (/commands) 명령어를 다시 로드했습니다.`);

    } catch (error) {
        console.error(error);
    }
})();

// 아래는 커맨드 삭제를 원할 때 주석을 풀고 node deploy-commands.js
// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
//     .then(() => console.log('Successfully deleted all guild commands.'))
//     .catch(console.error);

// // for global commands
// rest.put(Routes.applicationCommands(clientId), { body: [] })
//     .then(() => console.log('Successfully deleted all application commands.'))
//     .catch(console.error);
