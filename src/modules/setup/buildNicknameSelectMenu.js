const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const filterKeysByValue = require('../../shared/utils/filterKeysByValue');
const GAME_TYPES = require('@constants/gameTypes');
const GAME_DISPLAY_LABELS = require('@constants/gameLabels');
const GAME_DISPLAY_NAMES = require('@constants/gameDisplayNames');


/**
 * 선택 가능한 게임이 없는 경우 기본 옵션을 반환합니다.
 * 
 * @returns {StringSelectMenuOptionBuilder[]} '등록 가능한 메뉴 없음' 옵션
 */
function createNoOptions() {
    return [
        new StringSelectMenuOptionBuilder()
            .setLabel('등록 가능한 메뉴 없음')
            .setDescription('관리자님, 게임을 추가해주세요 !')
            .setValue('noOptions')
    ]
}

/**
 * 게임 타입에 따라 SelectMenu 옵션을 생성합니다.
 * 
 * @param {string} gameType - GAME_TYPES의 키값
 * @returns {StringSelectMenuOptionBuilder} Discord select 메뉴 옵션 객체
 */
function createOption(gameType) {
    let description
    if (gameType === GAME_TYPES.STEAM)
        description = '스팀 프로필 주소';

    else
        description = `${GAME_DISPLAY_NAMES[gameType]} 닉네임`;

    return new StringSelectMenuOptionBuilder()
        .setLabel(GAME_DISPLAY_LABELS[gameType])
        .setDescription(description)
        .setValue(gameType);
}

/**
 * 주어진 옵션들을 기반으로 SelectMenu 컴포넌트를 생성합니다.
 * 
 * @param {StringSelectMenuOptionBuilder[]} options - SelectMenu에 추가할 옵션 배열
 * @returns {ActionRowBuilder} Discord ActionRowBuilder 객체
 */
function buildSelectMenu(options) {
    const select = new StringSelectMenuBuilder()
        .setCustomId('gameMenu')
        .setPlaceholder('닉네임 등록 !')
        .addOptions(options);

    return new ActionRowBuilder().addComponents(select);
}

/**
 * 길드 설정에 따라 사용자에게 보여줄 SelectMenu 컴포넌트를 반환합니다.
 * 
 * @param {object} guildData - 길드의 게임 설정 객체 (예: { steam: true, leagueOfLegends: false, ... })
 * @returns {ActionRowBuilder} Discord SelectMenu ActionRow 컴포넌트
 */
module.exports = (guildData) => {
    try {
        // guildData에서 true로 설정된 게임 키만 필터링
        const visibleGameKeys = filterKeysByValue(guildData, true);

        // GAME_TYPES 순서에 따라 정렬된 게임 키 배열 생성
        const sortedGameKeys = Object.values(GAME_TYPES).filter(gameType => visibleGameKeys.includes(gameType));

        // 각 게임 키에 대한 옵션 생성
        let options = sortedGameKeys.map(gameType => createOption(gameType));
        if (options.length === 0)
            options = createNoOptions();

        return buildSelectMenu(options);

    } catch (error) {
        throw new Error('[buildNicknameSelectMenu] 메인 채널 메뉴 구성 중 오류:' + error.message);
    };
};