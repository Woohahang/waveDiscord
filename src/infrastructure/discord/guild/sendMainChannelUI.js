const GUILD_RESULT_CODES = require('@application/guild/constants/guildResultCodes');
const buildMainChannelPayload = require('../builders/buildMainChannelPayload');
const logger = require('@utils/logger');

/**
 * @typedef {import('@application/guild/usecases/sendMainChannelUIUseCase')} SendMainChannelUIUseCase
*/

/**
 * 길드의 메인 채널에 Wave UI 메시지를 전송합니다.
 * 
 * 메인 채널이 설정되지 않은 경우 조용히 종료되며,
 * 그 외 실패는 상위로 예외를 전파합니다.
 * 
 * @param {import('discord.js').Guild} guild - Discord 길드 객체
 * @param {Object} dependencies - 의존성 주입 객체
 * 
 * 메인 채널 UI 전송에 필요한 데이터를 조회하는 유스케이스
 * @param {SendMainChannelUIUseCase} dependencies.sendMainChannelUIUseCase
 * 
 * @returns {Promise<void>}
 */
module.exports = async function sendMainChannelUI(guild, dependencies) {
    try {
        const result = await dependencies.sendMainChannelUIUseCase
            .execute({ guildId: guild.id });

        if (!result.ok) {
            if (result.code === GUILD_RESULT_CODES.MAIN_CHANNEL_NOT_SET) {
                // await guild.interaction.send("Wave Main 채널 ID를 설정해주세요.") - 구현 예정
                return;
            }

            else
                throw new Error("[sendMainChannelUI] 알 수 없는 실패");
        }

        const { channelId, enabledGames } = result.data;

        const payload = buildMainChannelPayload(enabledGames);

        const channel = await guild.channels.fetch(channelId);
        await channel.send(payload);

    } catch (error) {
        logger.error('[sendMainChannelUI] 메인 채널 UI 발행 실패', {
            guildId: guild.id,
            guildName: guild.name,
            errorName: error.name,
            errorMessage: error.message,
            stack: error.stack
        });

        throw error;
    }
}