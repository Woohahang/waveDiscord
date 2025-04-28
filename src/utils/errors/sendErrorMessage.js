const errorMessages = require('./errorMessages');

async function sendErrorMessage(code, interaction) {
    try {
        await interaction.editReply({ content: errorMessages[code], ephemeral: true });
    } catch (error) {
        console.error('[errorMessages] 사용자에게 에러 메시지를 보내는 중 오류 발생:', error);
    }
}

module.exports = sendErrorMessage;