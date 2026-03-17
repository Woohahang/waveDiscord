const logger = require("@utils/logger");
const publishMainChannelUI = require('../guild/sendMainChannelUI');

async function buttonHandler(interaction, dependencies) {
    const customId = interaction.customId;
    const guild = interaction.guild;

    switch (customId) {
        case 'upDateButton':
            await publishMainChannelUI(guild, dependencies);
            break;

        default:
            logger.error('[buttonHandler] Unknown customId', {
                customId,
            })
    }

}

module.exports = buttonHandler;