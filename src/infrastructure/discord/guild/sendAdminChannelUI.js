const GUILD_RESULT_CODES = require('@application/guild/constants/guildResultCodes');
const buildAdminChannelPayload = require('../builders/buildAdminChannelPayload');
const logger = require('@utils/logger');

/**
 * @typedef {import('@application/guild/usecases/sendAdminChannelUIUseCase')} SendAdminChannelUIUseCase
*/

/**
 * 길드의 관리자 채널에 Wave UI 메시지를 전송합니다.
 * 
 * @param {import('discord.js').Guild} guild - Discord 길드 객체
 * @param {Object} dependencies - 의존성 주입 객체
 * @param {SendAdminChannelUIUseCase} dependencies.sendAdminChannelUIUseCase
 * 
 * @returns {Promise<void>}
 */
module.exports = async function sendAdminChannelUI(guild, dependencies) {
    try {
        const result = await dependencies.sendAdminChannelUIUseCase
            .execute({ guildId: guild.id });

        if (!result.ok) {
            if (result.code === GUILD_RESULT_CODES.ADMIN_CHANNEL_NOT_SET) {
                // await guild.interaction.send("Wave Admin 채널 ID를 설정해주세요.") - 구현 예정
                return;
            }

            else
                throw new Error("[sendAdminChannelUI] 알 수 없는 실패");
        }

        const { channelId } = result.data;
        const payload = buildAdminChannelPayload();

        const channel = await guild.channels.fetch(channelId);
        await channel.send(payload);

    } catch (error) {
        logger.error('[sendAdminChannelUI] 관리자 채널 UI 발행 실패', {
            guildId: guild.id,
            guildName: guild.name,
            errorName: error.name,
            errorMessage: error.message,
            stack: error.stack
        });

        throw error;
    }
}