const submitNickname = require("@modules/nicknameFlow/handlers/submitNickname");
const logger = require("@utils/logger");

const modalHandlers = {
    submitNickname,
    // 추후 추가 가능
};

async function handleSubmitModal(interaction) {
    try {
        const { action } = JSON.parse(interaction.customId);

        const handler = modalHandlers[action];
        if (!handler)
            throw new Error(`Unknown action: ${action}`);

        await handler(interaction);
    } catch (error) {
        logger.error('[handleSubmitModal] 처리 중 오류 발생', {
            errorMessage: error.message,
            stack: error.stack
        });
    }
};

module.exports = handleSubmitModal;