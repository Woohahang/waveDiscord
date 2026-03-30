const CUSTOM_IDS = require("@shared/constants/interactionCustomIds");

async function handleChannelSelectMenuInteraction(interaction, dependencies) {
    const customId = interaction.customId;

    switch (customId) {
        case CUSTOM_IDS.GUILD.SETUP.SELECT_MAIN_CHANNEL:
            await interaction.reply({ content: 'Main channel selected.', ephemeral: true });
            break;

        case CUSTOM_IDS.GUILD.SETUP.SELECT_ADMIN_CHANNEL:
            await interaction.reply({ content: 'Admin channel selected.', ephemeral: true });
            break;

        default:
            logger.error('[handleChannelSelectMenuInteraction] Unknown customId', {
                customId,
            });
    }

}

module.exports = handleChannelSelectMenuInteraction;