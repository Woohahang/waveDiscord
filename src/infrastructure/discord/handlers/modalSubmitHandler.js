const submitNickname = require('../interactions/modal/submitNickname');
const logger = require("@utils/logger");

async function modalSubmitHandler(interaction, dependencies) {
    const customId = interaction.customId;

    switch (customId) {
        case 'submitNickname':
            await submitNickname(interaction, dependencies);
            break;

        default:
            logger.error('[modalSubmitHandler] Unknown customId', {
                customId,
            })
    };
}

module.exports = modalSubmitHandler;