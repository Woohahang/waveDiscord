const logger = require("@utils/logger");

/**
 * 일정 시간 뒤 디스코드 메시지를 삭제하는 함수입니다.
 *
 * @param {Message} message - 삭제할 디스코드 메시지 객체
 * @param {number} [delay=20000] - 삭제까지 대기할 시간(ms), 기본값 20초
 */
function deleteMessageLater(message, delay = 20_000) {
    setTimeout(() => {
        message.delete()
            .catch(error => {
                logger.error('[deleteMessageLater] 메시지 삭제 오류', {
                    errorMessage: error.message
                })
            });
    }, delay);
};

module.exports = deleteMessageLater;