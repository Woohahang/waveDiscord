// messageAutoDelete.js

const TWENTY_SECONDS = 20_000; // 20초

// 20초 뒤 메세지 삭제
function messageAutoDelete(message) {
    setTimeout(() => {
        message.delete()
            .catch(error => {
                console.error('messageAutoDelete.js 20초 뒤 메세지 삭제 함수 예외 발생 : ', error);
            });
    }, TWENTY_SECONDS);
};

module.exports = messageAutoDelete;