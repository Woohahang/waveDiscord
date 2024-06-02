// messagesDelete.js

async function messagesDelete(channel, excludeIds = []) {
    try {
        // 채널의 메시지 수집
        const messages = await channel.messages.fetch({ limit: 10 });
        if (!messages) return;

        // 제외할 메시지 ID가 있는 경우, 해당 메시지를 제외하고 삭제
        const messagesToDelete = messages.filter(message => !excludeIds.includes(message.id));

        // 메시지들 삭제
        messagesToDelete.forEach(message => {
            message.delete().catch(error => console.error(`deleteMessages() 메시지 삭제 중 오류 발생: ${error}`));
        });

    } catch (error) {
        console.error('messageDelete.js 에러 : ', error);
    };
};

module.exports = { messagesDelete };