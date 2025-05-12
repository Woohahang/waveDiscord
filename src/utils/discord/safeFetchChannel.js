const Discord = require('discord.js');
const UNKNOWN_CHANNEL_ERROR = 10003;

/**
 * 주어진 채널 ID를 사용하여 길드에서 채널을 안전하게 가져옵니다.
 * 존재하지 않거나 접근 불가능한 경우(null 반환) 외의 오류는 그대로 throw됩니다.
 *
 * @param {Guild} guild - Discord.js의 Guild 객체
 * @param {string} channelId - 가져오려는 채널의 ID
 * @returns {Promise<GuildBasedChannel|null>} - 채널 객체 또는 존재하지 않을 경우 null
 * @throws {Error} - Discord API 오류 중 code !== 10003일 경우 예외 발생
 */
async function safeFetchChannel(guild, channelId) {
    try {
        if (!channelId) return null;

        else return await guild.channels.fetch(channelId);

    } catch (error) {
        if (error.code === UNKNOWN_CHANNEL_ERROR)
            return null;

        else
            throw new Error(`채널 찾는 중 오류 발생: ${error.message}`);
    }
}

module.exports = safeFetchChannel;