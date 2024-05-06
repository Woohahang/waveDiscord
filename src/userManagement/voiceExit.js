// src/userMangerment/voiceExit.js

module.exports = async (oldState, messageId) => {
    try {
        const channel = oldState.channel;
        if (!channel) return;
        const message = await channel.messages.fetch(messageId);
        if (message) {
            await message.delete();
            console.log("메시지가 삭제되었습니다.");
        }
    } catch (error) {
        console.error("메시지 삭제 중 오류 발생:", error);
    }
};