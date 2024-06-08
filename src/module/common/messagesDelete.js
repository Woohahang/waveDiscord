// messagesDelete.js

async function messagesDelete(channel, excludeIds = []) {
    try {
        // 채널의 메시지 수집
        const messages = await channel.messages.fetch({ limit: 10 });
        if (!messages) return;

        // 제외할 메시지 ID가 있는 경우, 해당 메시지를 제외하고 삭제
        const messagesToDelete = messages.filter(message => !excludeIds.includes(message.id));

        // 메세지들 삭제
        await Promise.all(messagesToDelete.map(message =>
            message.delete()
        ));

    } catch (error) {
        console.error('messageDelete.js 에러 : ', error);
    };
};

module.exports = { messagesDelete };