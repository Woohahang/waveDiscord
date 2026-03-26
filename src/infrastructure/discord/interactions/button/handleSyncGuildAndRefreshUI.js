const STATE_KEYS = require("@constants/stateKeys");
const buildAdminChannelPayload = require("@infrastructure/discord/builders/buildAdminChannelPayload");
const buildMainChannelPayload = require("@infrastructure/discord/builders/buildMainChannelPayload");
const isAdmin = require("@shared/utils/isAdmin");
const getStateMessage = require("@shared/utils/stateMessage");
const logger = require("@utils/logger");


/**
 * 채널이 존재할 때만 payload를 전송합니다.
 *
 * @param {import('discord.js').Guild} guild
 * @param {string|null} channelId
 * @param {Object} payload
 * @returns {Promise<void>}
 */
async function sendChannelPayload(guild, channelId, payload) {
    const channel = await guild.channels.fetch(channelId);

    if (!channel.id)
        throw new Error(`[sendChannelPayload] 채널을 찾을 수 없습니다. channelId=${channelId}`);

    await channel.send(payload);
}

module.exports = async function handleSyncGuildAndRefreshUI(interaction, dependencies) {

    const guild = interaction.guild;
    const member = interaction.member;

    try {
        // 관리자 체크
        if (!isAdmin(member))
            return await interaction.reply({
                content: getStateMessage(STATE_KEYS.ADMIN.NO_PERMISSION),
                ephemeral: true,
            });

        // 지연 응답
        await interaction.deferUpdate();

        const owner = await guild.fetchOwner();

        // 길드 정보 업데이트
        await dependencies.syncGuildInfoUseCase
            .execute({
                guildId: guild.id,
                guildName: guild.name,
                ownerId: guild.ownerId,
                ownerUsername: owner.user.username,
            });

        const guildUIDataResult = await dependencies.getGuildUIDataUseCase
            .execute({ guildId: guild.id });

        const { adminChannelId, mainChannelId, enabledGames } = guildUIDataResult.data;

        const adminPayload = buildAdminChannelPayload();
        const mainPayload = buildMainChannelPayload(enabledGames);

        await Promise.all([
            sendChannelPayload(guild, adminChannelId, adminPayload),
            sendChannelPayload(guild, mainChannelId, mainPayload),
        ]);

        // 업데이트 완료 메세지 전송
        await interaction.followUp({
            content: getStateMessage(STATE_KEYS.GUILD.UPDATE_SUCCESS),
            components: [],
            ephemeral: true
        });

    } catch (error) {
        logger.error('[handleSyncGuildAndRefreshUI] 업데이트 실패', error);
    }
}