const GUILD_RESULT_CODES = require('@application/guild/constants/guildResultCodes');
const buildMainChannelPayload = require('../builders/buildMainChannelPayload');
const logger = require('@utils/logger');

// 메인 채널로 설정된 채널에 메세지를 전송합니다.
module.exports = async function sendMainChannelUI(guild, dependencies) {
    try {
        const result = await dependencies.sendMainChannelUIUseCase.execute({ guildId: guild.id })

        if (!result.ok) {
            if (result.code === GUILD_RESULT_CODES.MAIN_CHANNEL_NOT_SET) {
                // await guild.interaction.send("Wave Main 채널 ID를 설정해주세요.") - 구현 예정
                return;
            }

            else
                throw new Error("[sendMainChannelUI] 알 수 없는 실패");
        }

        const { channelId, enabledGames } = result.data;
        const payload = buildMainChannelPayload({ enabledGames });

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