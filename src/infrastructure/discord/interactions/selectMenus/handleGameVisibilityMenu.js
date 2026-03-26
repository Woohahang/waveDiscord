const isAdmin = require("@shared/utils/isAdmin");
const getStateMessage = require('@shared/utils/stateMessage');
const buildGameVisibilityMenu = require('@infrastructure/discord/builders/guildVisibility/buildGameVisibilityMenu');
const STATE_KEYS = require("@constants/stateKeys");

function getUseCaseByActionType(actionType, dependencies) {
    const useCaseMap = {
        showMenu: dependencies.getShowableGamesUseCase,
        hideMenu: dependencies.getHideableGamesUseCase,
    };

    return useCaseMap[actionType] ?? null;
}

module.exports = async function handleGameVisibilityMenu(interaction, dependencies) {

    const actionType = interaction.values[0];
    const member = interaction.member;
    const guildId = interaction.guild.id;

    try {
        // 사용자가 관리자가 아닐 경우
        if (!isAdmin(member))
            return await interaction.reply({
                content: getStateMessage(STATE_KEYS.ADMIN.NO_PERMISSION),
                ephemeral: true,
            });

        const useCase = getUseCaseByActionType(actionType, dependencies);
        if (!useCase)
            throw new Error(`[handleGameVisibilityMenu] 유효하지 않은 actionType: ${actionType}`);

        const result = await useCase.execute({ guildId });

        // 메뉴 선택 옵션이 0개일 경우
        if (result.code) {
            return await interaction.reply({
                content: getStateMessage(result.code),
                ephemeral: true,
            });
        }

        const row = buildGameVisibilityMenu({ actionType, gameTypes: result.data });

        await interaction.reply({
            components: [row],
            ephemeral: true,
        });

    } catch (error) {
        console.error('[handleGameVisibilityMenu] 메뉴 생성중 에러', error);
    }
}

