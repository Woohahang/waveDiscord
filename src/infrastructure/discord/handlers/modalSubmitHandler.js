const handleSubmitNickname = require('../interactions/modal/handleSubmitNickname');
const logger = require("@utils/logger");

async function modalSubmitHandler(interaction, dependencies) {
    const customId = interaction.customId;

    switch (customId) {
        case 'submitNickname':
            return await handleSubmitNickname(interaction, dependencies);

        default:
            logger.error('[modalSubmitHandler] Unknown customId', {
                customId,
            })
            return
    };
}

module.exports = modalSubmitHandler;