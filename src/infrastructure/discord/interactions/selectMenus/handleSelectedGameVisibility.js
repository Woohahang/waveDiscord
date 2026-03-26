const STATE_KEYS = require("@constants/stateKeys");
const buildAdminChannelPayload = require("@infrastructure/discord/builders/buildAdminChannelPayload");
const buildMainChannelPayload = require("@infrastructure/discord/builders/buildMainChannelPayload");
const CUSTOM_IDS = require("@shared/constants/interactionCustomIds");
const getStateMessage = require("@shared/utils/stateMessage");
const logger = require("@utils/logger");

function getUseCaseByCustomId(customId, dependencies) {
    const useCaseMap = {
        [CUSTOM_IDS.GUILD.GAME_VISIBILITY.SHOW_SELECT]: dependencies.enableGuildGamesUseCase,
        [CUSTOM_IDS.GUILD.GAME_VISIBILITY.HIDE_SELECT]: dependencies.disableGuildGamesUseCase,
    };

    return useCaseMap[customId] ?? null;
}

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

module.exports = async function handleSelectedGameVisibility(interaction, dependencies) {

    const guild = interaction.guild;
    const customId = interaction.customId;
    const gameTypes = interaction.values;

    try {
        const gameVisibilityUseCase = getUseCaseByCustomId(customId, dependencies);
        if (!gameVisibilityUseCase)
            throw new Error(`[handleSelectedGameVisibility] 유효하지 않은 customId: ${customId}`);

        // 응답 대기
        await interaction.deferUpdate();

        // 게임들 활성화 or 비활성화 적용
        await gameVisibilityUseCase
            .execute({ guildId: guild.id, gameTypes, });

        const result = await dependencies.getGuildUIDataUseCase
            .execute({ guildId: guild.id });

        if (!result.ok)
            throw Error("[handleSelectedGameVisibility] 구현 예정");

        const { adminChannelId, mainChannelId, enabledGames } = result.data;

        const adminPayload = buildAdminChannelPayload();
        const mainPayload = buildMainChannelPayload(enabledGames);

        await Promise.all([
            sendChannelPayload(guild, adminChannelId, adminPayload),
            sendChannelPayload(guild, mainChannelId, mainPayload),
        ]);

        // 업데이트 완료 메세지 전송
        await interaction.editReply({
            content: getStateMessage(STATE_KEYS.GUILD.UPDATE_SUCCESS),
            components: [],
            ephemeral: true
        });

    } catch (error) {
        logger.error('[handleSelectedGameVisibility] 에러', {
            guildId: guild?.id,
            customId,
            gameTypes,
            errorName: error.name,
            errorMessage: error.message,
            stack: error.stack,
        });
    }
}