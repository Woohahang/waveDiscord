const GAME_TYPES = require("@constants/gameTypes");

/**
 * 게임 종류에 따라 사용자 게임 정보를 저장할 객체를 생성합니다.
 * 
 * @param {string} gameType - 게임 종류 (예: LEAGUE_OF_LEGENDS, STEAM 등)
 * @param {string} formattedNickname - 게임 타입에 맞게 포맷된 닉네임
 * @param {Object|string|null} gameEntry - API 호출 결과 등 게임별 추가 데이터
 * @returns {Object} DB에 저장할 게임별 닉네임 엔트리 객체
 */
function createUserGameEntry(gameType, formattedNickname, gameEntry) {
    switch (gameType) {
        case GAME_TYPES.LEAGUE_OF_LEGENDS:
            return {
                nickname: formattedNickname,
                tier: gameEntry?.tier ?? null,                 // 'DIAMOND', 'PLATINUM', 'GOLD' ..
                rank: gameEntry?.rank ?? null,                 // 'I', 'II', 'III', 'IV'
                leaguePoints: gameEntry?.leaguePoints ?? null, // 20LP ..
            };

        case GAME_TYPES.STEAM:
            return {
                nickname: gameEntry,         // 스팀 API에서 받은 플레이어 이름
                profileLink: formattedNickname // 스팀 프로필 링크

            };

        default:
            // 기타 게임은 닉네임만 저장
            return formattedNickname;
    }
}

module.exports = createUserGameEntry;