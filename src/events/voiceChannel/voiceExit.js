// voiceExit.js

async function voiceExit(oldState, messageId) {
    try {
        const channel = oldState.channel;
        if (!channel) return;

        const message = await channel.messages.fetch(messageId);

        if (message) {
            await message?.delete();
        };
    } catch (error) {
        // 단지 로그만 남긴 것, 메시지 삭제 되었을 경우
        console.error("메시지 삭제 중 오류 발생:", error);
    };
};

module.exports = { voiceExit };