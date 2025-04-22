const GAME_TYPES = require('../../../constants/gameTypes');
const RIOT_GAMES = require('../../../constants/riotGames');
const formatRiotTag = require('./formatRiotTag');
const fetchSteamProfile = require('./fetchSteamProfile');

/**
 * 게임 타입에 따라 닉네임을 처리합니다.
 * - 라이엇 게임즈는 태그 형식으로 포맷팅
 * - 스팀은 프로필 주소에서 ID 추출
 * - 그 외는 원본 그대로 반환합니다.
 *
 * @param {string} gameType - 게임 종류
 * @param {string} nickname - 사용자 입력 닉네임
 * @returns {Promise<string>} - 전처리된 닉네임
 */
async function processNickname(gameType, nickname) {
    if (RIOT_GAMES.includes(gameType))
        return formatRiotTag(nickname); // Riot 게임 포맷 변환

    if (gameType === GAME_TYPES.STEAM)
        return await fetchSteamProfile(nickname); // Steam ID 추출

    return nickname;
}

module.exports = processNickname;