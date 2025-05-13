const getStateMessage = require('@shared/utils/stateMessage');
const GuildSettings = require('@services/GuildSettings');
const logger = require('@utils/logger');
const STATE_KEYS = require('@constants/stateKeys');
const setupMainChannel = require('@module/setup/setupMainChannel');
const setupAdminChannel = require('@module/setup/setupAdminChannel');
const saveBasicGuildInfo = require('@module/setup/saveBasicGuildInfo');
const ERROR_KEY = require('@constants/errorKeys');

/**
 * 서버 관리자 전용: 사용자가 선택한 게임의 가시성을 변경하는 기능을 수행합니다.
 * 업데이트 후, 관리자 채널과 메인 채널을 업데이트하며, 사용자에게 완료 상태를 응답합니다.
 * 
 * @param {import('discord.js').StringSelectMenuInteraction} interaction - Discord의 interaction 객체
 */
module.exports = async (interaction) => {

    // 사용자 요청에 따른 메뉴 동작 유형 ('showMenu' 또는 'hideMenu')
    const menuAction = interaction.customId;

    // '보이기' 또는 '숨기기' 여부를 결정합니다.
    const isVisible = (menuAction === 'showMenu');

    // 사용자가 선택한 게임 키 목록 (예: ['leagueOfLegends', 'valorant'] 등)
    const selectedGameKeys = interaction.values;

    try {
        // 길드 설정 정보 불러오기
        const guildSettings = new GuildSettings(interaction.guild.id);

        // 게임의 가시성을 설정하고 업데이트된 길드 데이터를 반환
        await guildSettings.saveGameVisibility(isVisible, selectedGameKeys);

        // 사용자에게 초기 응답을 즉시 보냅니다.
        await interaction.update({ content: '업데이트를 시작했습니다. 잠시만 기다려주세요...', components: [], ephemeral: true });

        const resultKey = await Promise.all([
            saveBasicGuildInfo(interaction.guild),
            setupAdminChannel(interaction.guild),
            setupMainChannel(interaction.guild)
        ])
            .then(() => STATE_KEYS.GUILD_UPDATE_SUCCESS)
            .catch(() => ERROR_KEY.GUILD_UPDATE_FAILED);

        await interaction.editReply({ content: getStateMessage(resultKey), components: [], ephemeral: true });

    } catch (error) {
        logger.error('[toggleMenuHandler] 메뉴 업데이트 도중 오류', {
            menuAction,
            selectedGameKeys,
            stack: error.stack
        })
    };
};