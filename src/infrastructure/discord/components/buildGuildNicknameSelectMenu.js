const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, } = require('discord.js');
const { GAME_TYPES } = require('@constants/gameTypes');
const getGameDisplayName = require('@shared/utils/getGameDisplayName');

/**
 * 게임 타입에 맞는 닉네임 입력 설명을 생성합니다.
 * 예:
 * - STEAM → "스팀 프로필 주소"
 * - 기타 → "리그오브레전드 닉네임", "발로란트 닉네임"
 */
function getNicknameOptionDescription(gameType) {
    if (gameType === GAME_TYPES.STEAM) {
        return '스팀 프로필 주소';
    }

    // 예: "리그오브레전드 닉네임"
    return `${getGameDisplayName(gameType, 'ko')} 닉네임`;
}

/**
 * 서버에 등록된 게임이 하나도 없을 때
 * 표시할 기본 옵션을 생성합니다.
 */
function createEmptyOption() {
    return new StringSelectMenuOptionBuilder()
        .setLabel('등록 가능한 메뉴 없음')
        .setDescription('관리자님, 게임을 추가해주세요 !')
        .setValue('noOptions');
}

/**
 * 게임 하나에 대한 SelectMenu 옵션을 생성합니다.
 *
 * label       → 영어 게임 이름
 * description → 닉네임 입력 설명
 * value       → gameType (선택 시 전달되는 값)
 */
function createGameSelectOption(gameType) {
    return new StringSelectMenuOptionBuilder()
        .setLabel(getGameDisplayName(gameType, 'en'))
        .setDescription(getNicknameOptionDescription(gameType))
        .setValue(gameType);
}

/**
 * 활성화된 게임 목록을 기반으로 SelectMenu 옵션 배열을 생성합니다.
 *
 * - 게임이 없으면 안내용 옵션을 반환
 * - 게임이 있으면 각 게임을 옵션으로 변환
 */
function createGameSelectOptions(enabledGames) {
    if (enabledGames.length === 0) {
        return [createEmptyOption()];
    }

    return enabledGames.map(createGameSelectOption);
}

/**
 * 길드 설정을 기반으로
 * 닉네임 등록용 게임 선택 메뉴를 생성합니다.
 */
module.exports = function buildGuildNicknameSelectMenu(enabledGames) {
    const options = createGameSelectOptions(enabledGames);

    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('gameMenu')
        .setPlaceholder('닉네임 등록 !')
        .addOptions(options);

    // 클릭 불가능 비활성화
    if (enabledGames.length === 0) {
        selectMenu.setDisabled(true);
    }

    return new ActionRowBuilder().addComponents(selectMenu);
}