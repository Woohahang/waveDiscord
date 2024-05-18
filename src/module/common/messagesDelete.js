// messagesDelete.js

async function messagesDelete(channel) {
    try {
        // 채널의 메시지 수집
        const messages = await channel.messages.fetch({ limit: 10 });

        if (!messages) return;

        // 메시지들 삭제
        messages.forEach(message => {
            message.delete().catch(error => console.error(`deleteMessages() 메시지 삭제 중 오류 발생: ${error}`));
        });

    } catch (error) {
        console.error('messageDelete.js 에러 : ', error);
    };
};

module.exports = { messagesDelete };