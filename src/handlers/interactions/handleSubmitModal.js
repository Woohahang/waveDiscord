const submitNickname = require("@modules/nicknameFlow/handlers/submitNickname");
const logger = require("@utils/logger");

async function handleSubmitModal(interaction) {
    const customId = interaction.customId;
    const customIdParts = customId.split('_')[0];

    switch (customIdParts) {
        case 'submitNickname':
            await submitNickname(interaction);
            break;

        default:
            logger.error('[interaction.handleSubmitModal] Unknown customIdParts', {
                customId,
                customIdParts
            })
    };
};

module.exports = handleSubmitModal;