const GAME_TYPES = require('@constants/gameTypes');
const getGameLogoEmoji = require('@constants/gameLogoEmoji');
const getGamesLink = require('@shared/game/getGamesLink');

/**
 * 게임 종류에 따라 닉네임을 이모지와 함께 포맷팅합니다.
 * - Steam: 닉네임과 함께 프로필 링크 포함
 * - Overwatch2, Blizzard: 닉네임만 표시
 * - 그 외: 닉네임과 검색 링크 포함
 *
 * @param {string} gameType - 게임 키 (예: 'steam', 'blizzard')
 * @param {Object|string} nickname - 닉네임 정보 (Steam은 객체, 그 외는 문자열)
 * @returns {string} - 포맷팅된 닉네임 문자열
 */
function formatNicknameLine(gameType, nickname) {
    const gameLogoEmoji = getGameLogoEmoji(gameType); // 해당 게임 이모지 구성

    switch (gameType) {
        case GAME_TYPES.STEAM:
            return `${gameLogoEmoji} [${nickname.playerName}](${nickname.profileLink})`;

        case GAME_TYPES.LEAGUE_OF_LEGENDS:
            return `${gameLogoEmoji} [${nickname.summonerName}](${getGamesLink(gameType, nickname.summonerName)})`;

        case GAME_TYPES.OVERWATCH_2:
        case GAME_TYPES.BLIZZARD:
            return `${gameLogoEmoji} ${nickname}`;

        default:
            return `${gameLogoEmoji} [${nickname}](${getGamesLink(gameType, nickname)})`;
    }
}

module.exports = formatNicknameLine;