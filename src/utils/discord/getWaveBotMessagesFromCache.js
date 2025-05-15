const botInfo = require('@utils/botInfo');

/**
 * 해당 채널의 메시지 캐시에서 Wave 봇이 보낸 메시지만 필터링합니다.
 *
 * @param {TextChannel|VoiceChannel} channel - 디스코드 채널 객체
 * @returns {Collection<Snowflake, Message>} Wave 봇이 보낸 메시지 컬렉션
 */
function getWaveBotMessagesFromCache(channel) {
    const messages = channel.messages.cache;
    return messages.filter(msg => msg.author.id === botInfo.get().botId);
}

module.exports = getWaveBotMessagesFromCache;