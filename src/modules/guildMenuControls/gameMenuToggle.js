const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const STATE_KEYS = require('@constants/stateKeys');
const { GAME_TYPES } = require('@constants/gameTypes');
const ERROR_KEY = require('@constants/errorKeys');
const GAME_DISPLAY_LABELS = require('@constants/gameLabels');
const GAME_DISPLAY_NAMES = require('@constants/gameDisplayNames');
const GuildSettings = require('@services/GuildSettings');
const isAdmin = require('@shared/utils/isAdmin');
const resetMenuSelection = require('@shared/utils/resetMenuSelection');
const logger = require('@utils/logger');
const sendStateMessage = require('@utils/discord/sendStateMessage');
const getGamesByCondition = require('@shared/utils/getGamesByCondition');

/**
 * 메뉴 동작에 따라 필터링할 게임의 표시 상태를 매핑합니다.
 * 
 * - 'showMenu': 현재 숨겨진(false) 게임들만 필터링하여 표시 (→ 유저가 추가할 수 있게 하기 위함)
 * - 'hideMenu': 현재 표시 중(true)인 게임들만 필터링하여 표시 (→ 유저가 숨길 수 있게 하기 위함)
 */
const menuVisibilityMap = {
    showMenu: false,    // 현재 숨겨진 게임들 중에서 추가할 게임을 고르기 위해 필터링
    hideMenu: true      // 현재 보이는 게임들 중에서 숨길 게임을 고르기 위해 필터링
};

// 각 메뉴 동작에 따라 응답할 상태 메시지 키를 지정
const menuStateKey = {
    showMenu: STATE_KEYS.NO_MENU_TO_SHOW,
    hideMenu: STATE_KEYS.NO_MENU_TO_HIDE,
};

// 각 메뉴 동작에 따라 SelectMenu의 placeholder 텍스트 설정
const PLACEHOLDER_TEXT = {
    showMenu: '추가할 게임을 선택하세요',
    hideMenu: '제거할 게임을 선택하세요',
};

// 각 메뉴 동작에 따라 메뉴 설명에 붙일 텍스트 설정
const ACTION_SUFFIX = {
    showMenu: ' 추가하기 !',
    hideMenu: ' 삭제하기 !',
};

/**
 * 주어진 게임 필드와 메뉴 동작에 따라 SelectMenu 옵션을 생성합니다.
 * 
 * @param {string} field - 게임 키 (예: 'leagueOfLegends')
 * @param {string} menuAction - 'showMenu' 또는 'hideMenu'
 * @returns {StringSelectMenuOptionBuilder}
 */
function createMenuOption(field, menuAction) {
    const suffix = ACTION_SUFFIX[menuAction];

    return new StringSelectMenuOptionBuilder()
        .setLabel(GAME_DISPLAY_LABELS[field])
        .setDescription(GAME_DISPLAY_NAMES[field] + suffix)
        .setValue(field)
};

/**
 * SelectMenu 옵션들을 포함한 ActionRow를 생성합니다.
 * 
 * @param {StringSelectMenuOptionBuilder[]} menuOptions - SelectMenu에 포함할 옵션 리스트
 * @param {string} menuAction - 'showMenu' 또는 'hideMenu'
 * @returns {ActionRowBuilder}
 */
function buildMenuActionRow(menuOptions, menuAction) {
    const placeholder = PLACEHOLDER_TEXT[menuAction];

    const select = new StringSelectMenuBuilder()
        .setCustomId(menuAction)
        .setPlaceholder(placeholder)
        .setMinValues(1)
        .setMaxValues(menuOptions.length)
        .addOptions(menuOptions);

    return new ActionRowBuilder().addComponents(select);
};

/**
 * 서버 관리자 전용: 길드 내 게임 메뉴를 표시하거나 숨기는 SelectMenu를 생성하여 응답합니다.
 * 
 * - 'showMenu'를 선택하면, 현재 숨겨진 게임 목록을 보여주어 관리자가 추가할 수 있도록 합니다.
 * - 'hideMenu'를 선택하면, 현재 보이는 게임 목록을 보여주어 관리자가 삭제할 수 있도록 합니다.
 * 
 * @param {import('discord.js').StringSelectMenuInteraction} interaction - SelectMenuInteraction 객체, 사용자가 선택한 메뉴 값에 따라 처리됩니다.
 */
module.exports = async (interaction) => {

    const guild = interaction.guild;
    const menuAction = interaction.values[0]; // 'showMenu' 또는 'hideMenu'

    try {
        // 기존 메시지의 선택 상태 초기화
        await resetMenuSelection(interaction.message);

        // 관리자 권한 검증
        if (!isAdmin(interaction.member))
            return await sendStateMessage(interaction, STATE_KEYS.NO_ADMIN_PERMISSION);

        // 길드 설정 정보 불러오기
        const guildSettings = new GuildSettings(guild.id);
        const guildConfig = await guildSettings.getConfig();

        // 표시/숨김 여부에 해당하는 필드값(true 또는 false) 추출
        const targetValue = menuVisibilityMap[menuAction];
        if (targetValue === undefined) {
            logger.error('[gameMenuToggle] menuVisibilityMap 정의되어 있지 않는 값', {
                guildId: guild.id,
                guildName: guild.name,
                menuAction,
            })
            return await sendStateMessage(interaction, ERROR_KEY.UNKNOWN_MENU_SELECTION);
        }

        // 현재 길드 설정에서 해당 값(true/false)을 가진 게임 키만 필터링
        const matchingGameKeys = getGamesByCondition(guildConfig, targetValue);

        // 해당 상태에 맞는 게임이 없으면 메시지 응답
        if (matchingGameKeys.length === 0) {
            const key = menuStateKey[menuAction];
            return await sendStateMessage(interaction, key);
        }

        // GAME_TYPES 순서를 기준으로 정렬하여 일관된 메뉴 표시
        const sortedGameKeys = Object.values(GAME_TYPES).filter(label => matchingGameKeys.includes(label));

        // SelectMenu 옵션 생성
        const menuOptions = sortedGameKeys.map(gameType => createMenuOption(gameType, menuAction));

        // 메뉴 구성 후 사용자에게 응답
        const row = buildMenuActionRow(menuOptions, menuAction);
        await interaction.reply({
            components: [row],
            ephemeral: true
        });

    } catch (error) {
        logger.error('[gameMenuToggle] 메뉴 토글 처리 중 예외 발생', {
            guildId: guild.id,
            guildName: guild.name,
            stack: error.stack
        })
    };
};