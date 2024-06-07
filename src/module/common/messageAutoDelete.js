// messageAutoDelete.js

// 10초
const TEN_SECONDS = 10_000;

// 10초 뒤 메세지 삭제
async function messageAutoDelete(message) {
    setTimeout(async () => {
        try {
            await message.delete();
        } catch (error) {
            console.error('메시지 삭제 중 에러 발생', error);
        }
    }, TEN_SECONDS);
};

module.exports = messageAutoDelete;