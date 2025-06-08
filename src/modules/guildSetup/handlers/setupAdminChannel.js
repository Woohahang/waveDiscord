const GuildSettings = require("@services/GuildSettings");
const safeFetchChannel = require("@utils/discord/safeFetchChannel");
const createAdminActionButtons = require('../createAdminActionButtons');
const createAdminMenuSelect = require('../createAdminMenuSelect');
const createAdminChannel = require("@modules/guildSetup/createAdminChannel");
const logger = require("@utils/logger");
const fetchBotMessages = require("@utils/discord/fetchBotMessages");
const { GUILD_CHANNEL_TYPES } = require("@constants/guild");


module.exports = async (guild) => {
    try {
        // 길드 설정을 불러오거나 새로 생성
        const guildSettings = new GuildSettings(guild.id);
        const guildConfig = await guildSettings.getConfig();

        let channel = await safeFetchChannel(guild, guildConfig.getAdminChannelId());
        if (!channel) {
            channel = await createAdminChannel(guild);
            await guildSettings.saveChannelId(GUILD_CHANNEL_TYPES.ADMIN, channel.id);
        }

        // 최근 메시지 중 Wave 봇이 보낸 메시지 필터링
        const botMessages = await fetchBotMessages(channel);

        await channel.send({
            content: '# ⭐ Wave 관리자 채널',
            components: [
                createAdminMenuSelect(),
                createAdminActionButtons()
            ],
        })

        // 이전 Wave 봇 메시지 삭제
        await Promise.all(botMessages.map(msg => msg.delete()).filter(Boolean));

    } catch (error) {
        logger.error('[setupAdminChannel] 관리자 채널 구성 중 오류', {
            errorMessage: error.message,
            guildId: guild.id,
            channelType: GUILD_CHANNEL_TYPES.ADMIN,
        })

        throw error;
    }
}