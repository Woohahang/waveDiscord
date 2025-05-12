const GuildSettings = require("@services/GuildSettings");
const safeFetchChannel = require("@utils/discord/safeFetchChannel");
const createAdminActionButtons = require('./createAdminActionButtons');
const createAdminMenuSelect = require('./createAdminMenuSelect');
const createAdminChannel = require("@module/setup/createAdminChannel");
const logger = require("@utils/logger");
const botInfo = require('@utils/botInfo');

module.exports = async (guild) => {
    try {
        // 길드 설정을 불러오거나 새로 생성
        const guildSettings = new GuildSettings(guild.id);
        const guildData = await guildSettings.loadOrCreate();

        let channel = await safeFetchChannel(guild, guildData.adminChannelId);
        if (!channel) {
            channel = await createAdminChannel(guild);
            await guildSettings.saveChannelId('adminChannel', channel.id);
        }

        // 최근 메시지 중 Wave 봇이 보낸 메시지 필터링
        const messages = await channel.messages.fetch({ limit: 30 });
        const botMessages = messages.filter(msg => msg.author.id === botInfo.get().botId);

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
            channelType: 'adminChannelId',
        })

        throw error;
    }
}