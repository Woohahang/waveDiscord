const commands = require('@infrastructure/discord/commands');
const logger = require('@utils/logger');

const commandMap = new Map(
    commands.map(command => [command.data.name, command])
);

async function handleCommandInteraction(interaction, dependencies) {
    const commandName = interaction.commandName;
    const command = commandMap.get(commandName);

    if (!command)
        return logger.error('[handleCommandInteraction] Unknown command', {
            commandName,
        });

    try {
        await command.execute(interaction, dependencies);

    } catch (error) {
        logger.error('[handleCommandInteraction] 슬래시 커맨드 처리 중 오류', {
            commandName,
            userId: interaction.user?.id,
            guildId: interaction.guild?.id,
            stack: error.stack,
        });
    }
}

module.exports = handleCommandInteraction;