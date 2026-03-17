const logger = require('@utils/logger');
const syncGuildBasicInfo = require('../guild/syncGuildBasicInfo');
const sendMainChannelUI = require('../guild/sendMainChannelUI');

/**
 * 봇이 새로운 서버에 추가될 때 실행되는 로직
 *
 * @param {import('discord.js').Guild} guild
 * @param dependencies
 */
async function guildCreateHandler(guild, dependencies) {
    try {

        await syncGuildBasicInfo(guild, dependencies);

        await sendMainChannelUI(guild, dependencies);

    } catch (error) {
        logger.error('[guildCreateHandler] 길드 생성 이벤트 처리 중 오류 발생', {
            guildId: guild.id,
            guildName: guild.name,
            errorName: error.name,
            errorMessage: error.message,
            stack: error.stack,
        });
    }

    // 관리자 id 저장
    // 메인 채널 생성
    // 관리자 채널 생성

}

module.exports = guildCreateHandler;