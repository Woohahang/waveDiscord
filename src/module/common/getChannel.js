/**
 * 채널을 가져오는 함수
 * 
 * @param {Guild} guild - Discord 길드 객체
 * @param {string} channelId - 채널 ID
 * @returns {Channel|null} - 관리자 채널 객체 또는 null
*/
async function getChannel(guild, channelId) {
    if (!channelId) return null;

    try {
        return await guild.channels.fetch(channelId);
    } catch (error) {
        return null;
    }
}

module.exports = getChannel;