const logger = require('@utils/logger');

/**
 * 주어진 채널에서 Wave 봇이 보낸 메시지를 가져옵니다.
 * 
 * @param {import('discord.js').TextChannel} channel - 메시지를 가져올 디스코드 채널 객체
 * @param {string} botId - Wave 봇의 ID
 * @param {number} limit - 가져올 메시지 수 (기본값: 30)
 * @returns {Promise<import('discord.js').Collection<string, import('discord.js').Message>>} - 봇 메시지 컬렉션
 */
async function fetchBotMessages(channel, botId, limit = 30) {
    try {
        const messages = await channel.messages.fetch({ limit });
        return messages.filter(msg => msg.author.id === botId);
    } catch (error) {
        logger.error('[fetchBotMessages] Wave 봇이 보낸 메시지를 가져오는 중 오류', {
            stack: error.stack
        })
    }
}

module.exports = fetchBotMessages;