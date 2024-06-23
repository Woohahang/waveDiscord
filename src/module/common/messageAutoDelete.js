// 20초 뒤 메세지를 삭제하는 함수입니다.
function messageAutoDelete(message) {
    const TWENTY_SECONDS = 20_000; // 20초

    setTimeout(() => {
        message.delete()
            .catch(error => {
                console.error('messageAutoDelete.js 20초 뒤 메세지 삭제 함수 예외 발생 : ', error);
            });
    }, TWENTY_SECONDS);
};

module.exports = messageAutoDelete;