const REPLY_METHODS = require('@constants/replyMethods');
const getStateMessage = require('@shared/utils/stateMessage');
const logger = require('@utils/logger');
const deleteMessageLater = require('./deleteMessageLater');

/**
 * 상태 메시지를 전송합니다.
 *
 * @param {Object} interaction - Discord interaction 객체
 * @param {string} stateKey - 상태 메시지 키
 * @param {'reply' | 'editReply'} method - 사용할 메서드 (기본값: 'reply')
 */
async function sendStateMessage(interaction, stateKey, method = REPLY_METHODS.REPLY) {
    try {
        const content = getStateMessage(stateKey);
        await interaction[method]({ content, ephemeral: true });

    } catch (error) {
        logger.error('[sendStateMessage] 상태 메시지 전송 실패', {
            errorMessage: error.message,
            stateKey,
            method
        });
        throw error;
    }
}

module.exports = sendStateMessage;