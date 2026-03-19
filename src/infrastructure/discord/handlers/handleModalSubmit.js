const CUSTOM_IDS = require('@shared/constants/interactionCustomIds');
const handleSubmitNickname = require('../interactions/modal/handleSubmitNickname');
const logger = require("@utils/logger");

async function handleModalSubmit(interaction, dependencies) {
    const customId = interaction.customId;

    switch (customId) {
        case CUSTOM_IDS.USER.REGISTER_NICKNAME.SUBMIT:
            await handleSubmitNickname(interaction, dependencies);
            break;

        default:
            logger.error('[handleModalSubmit] Unknown customId', {
                customId,
            })
    };
}

module.exports = handleModalSubmit;