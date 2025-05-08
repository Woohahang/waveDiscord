const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const STATE_KEYS = require('@constants/stateKeys');
const GAME_TYPES = require('@constants/gameTypes');
const ERROR_KEY = require('@constants/errorKeys');
const GAME_DISPLAY_LABELS = require('@constants/gameLabels');
const GAME_DISPLAY_NAMES = require('@constants/gameDisplayNames');
const GuildSettings = require('@services/GuildSettings');
const isAdmin = require('@shared/utils/isAdmin');
const filterKeysByValue = require('@shared/utils/filterKeysByValue');
const resetMenuSelection = require('@shared/utils/resetMenuSelection');
const replyStateMessage = require('@shared/utils/replyStateMessage');
const logger = require('@utils/logger');

// 각 메뉴 동작에 따른 표시 여부 매핑 (false: 표시됨, true: 숨김)
const menuVisibilityMap = {
    showMenu: false,
    hideMenu: true
};

// 각 메뉴 동작에 따른 상태 메시지 키
const menuStateKey = {
    showMenu: STATE_KEYS.NO_MENU_TO_SHOW,
    hideMenu: STATE_KEYS.NO_MENU_TO_HIDE,
};

/**
 * 게임 메뉴 옵션을 포함한 SelectMenu 컴포넌트를 구성합니다.
 * @param {string[]} options - 선택 가능한 게임 키 리스트
 * @param {string} value - 'showMenu' 또는 'hideMenu'
 * @returns {ActionRowBuilder}
 */
function buildMenuActionRow(options, value) {
    const select = new StringSelectMenuBuilder()
        .setCustomId(value)
        .setPlaceholder(value === 'showMenu' ? ' 추가하기 !' : ' 삭제하기 !')
        .setMinValues(1)
        .setMaxValues(options.length)
        .addOptions(
            options.map(field => (
                new StringSelectMenuOptionBuilder()
                    .setLabel(GAME_DISPLAY_LABELS[field])
                    .setDescription(GAME_DISPLAY_NAMES[field] + (value === 'showMenu' ? ' 추가하기 !' : ' 삭제하기 !'))
                    .setValue(field)
            ))
        );

    return new ActionRowBuilder().addComponents(select);
};

/**
 * 관리자 전용: 게임 메뉴 숨기기/표시 토글을 위한 메뉴를 응답합니다.
 */
module.exports = async (interaction) => {

    const guild = interaction.guild;
    const value = interaction.values[0]; // 'showMenu' 또는 'hideMenu'

    try {
        // 기존 메시지의 선택 상태 초기화
        await resetMenuSelection(interaction.message);

        // 관리자 권한 검증
        if (!isAdmin(interaction.member))
            return await replyStateMessage(interaction, STATE_KEYS.NO_ADMIN_PERMISSION);

        // 길드 인스턴스 생성 및 길드 데이터 불러오기
        const guildSettings = new GuildSettings(guild.id);
        const guildData = await guildSettings.loadOrCreate();

        // 사용자가 선택한 메뉴의 대상 값 추출 (true/false)
        const targetValue = menuVisibilityMap[value];
        if (targetValue === undefined) {
            logger.error('[gameMenuToggle] menuVisibilityMap 정의되어 있지 않는 값', {
                guildId: guild.id,
                guildName: guild.name,
                value,
            })
            return await replyStateMessage(interaction, ERROR_KEY.UNKNOWN_MENU_SELECTION);
        }

        // 현재 길드 설정에서 해당 상태(true/false)에 해당하는 게임 필터링
        let options = filterKeysByValue(guildData, targetValue);

        // 해당 상태의 메뉴가 존재하지 않으면 메시지로 응답
        if (options.length === 0) {
            const key = menuStateKey[value];
            return await replyStateMessage(interaction, key);
        }

        // GAME_TYPES 기준으로 정렬 (일관된 표시 순서 보장)
        options = Object.values(GAME_TYPES).filter(label => options.includes(label));

        // 선택 메뉴 구성 및 응답
        const row = buildMenuActionRow(options, value);
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