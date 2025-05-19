const ERROR_KEY = require("@constants/errorKeys");
const GAME_TYPES = require("@constants/gameTypes");

/**
 * 닉네임 사용 가능 여부를 확인하고, 문제가 있을 경우 상태 키를 반환합니다.
 *
 * - 중복된 닉네임인지 확인
 * - 게임별 닉네임 등록 제한(최대 5개) 확인
 *
 * @param {Object} userData - 사용자의 게임별 닉네임 데이터
 * @param {string} gameType - 게임 종류 (예: LEAGUE_OF_LEGENDS, STEAM 등)
 * @param {string} nickname - 저장하려는 닉네임 또는 유저 식별자
 * @returns {string|null} 상태 키 (중복 또는 제한 초과 시), 없으면 null
 */
function getNicknameAvailabilityError(userData, gameType, nickname) {
    const entries = userData[gameType];

    // 닉네임 중복 검사
    const isDuplicate = (() => {
        switch (gameType) {
            case GAME_TYPES.LEAGUE_OF_LEGENDS:
                return entries.some(entry => entry.nickname === nickname);

            case GAME_TYPES.STEAM:
                return entries.some(entry => entry.nickname === nickname);

            default:
                return entries.includes(nickname);
        }
    })();
    if (isDuplicate)
        return ERROR_KEY.NICKNAME_SAVE_DUPLICATE;

    // 닉네임 저장 갯수 5개 초과 검사
    if (entries.length >= 5) {
        return ERROR_KEY.NICKNAME_SAVE_LIMIT_EXCEEDED;
    }
    // 에러 없음
    return null;
}

module.exports = getNicknameAvailabilityError;