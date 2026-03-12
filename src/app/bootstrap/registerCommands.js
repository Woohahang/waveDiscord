// app/bootstrap/registerCommands.js

const { REST, Routes } = require("discord.js")

async function registerCommands(commands) {

    const rest = new REST({ version: "10" })
        .setToken(process.env.DISCORD_TOKEN)

    const clientId = process.env.CLIENT_ID
    const guildId = process.env.GUILD_ID

    const commandData = commands.map(cmd => cmd.data)

    await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commandData }
    )

    console.log("Slash commands registered")
}

module.exports = registerCommands