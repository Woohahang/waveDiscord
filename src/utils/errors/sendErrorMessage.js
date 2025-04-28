const errorMessages = require('./errorMessages');

/**
 * 주어진 에러 코드에 해당하는 에러 메시지를 사용자에게 전송하는 함수
 * 
 * @param {string} code - 전송할 에러 메시지의 코드 (예: 'INVALID_PROFILE_LINK', 'USER_PROFILE_NOT_FOUND' 등)
 * @param {Object} interaction - Discord interaction 객체, 에러 메시지를 보낼 채팅 인터페이스
 */
async function sendErrorMessage(code, interaction) {
    try {
        await interaction.editReply({ content: errorMessages[code], ephemeral: true });
    } catch (error) {
        console.error('[errorMessages] 사용자에게 에러 메시지를 보내는 중 오류 발생:', error);
    }
}

module.exports = sendErrorMessage;