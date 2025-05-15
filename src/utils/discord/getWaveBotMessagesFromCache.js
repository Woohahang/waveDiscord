const botInfo = require('@utils/botInfo');

function getWaveBotMessagesFromCache(channel) {
    const messages = channel.messages.cache;
    return messages.filter(msg => msg.author.id === botInfo.get().botId);
}

module.exports = getWaveBotMessagesFromCache;