const { REST, Routes } = require("discord.js");
const logger = require('@utils/logger');

async function registerCommands(commands) {
    const token = process.env.DISCORD_TOKEN;
    const clientId = process.env.CLIENT_ID;
    const guildId = process.env.GUILD_ID;

    const rest = new REST({ version: "10" }).setToken(token);
    const commandData = commands.map(command => command.data);

    // 개발 용도: Guild Commands - 즉시 등록
    await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commandData }
    );

    // 배포 용도: Global Commands - 반영까지 1시간 소요
    // await rest.put(
    //     Routes.applicationCommands(clientId),
    //     { body: commandData }
    // )

    logger.info('[registerCommands] 슬래시 커맨드 등록 완료', {
        count: commandData.length,
        guildId,
    });
}

module.exports = registerCommands;