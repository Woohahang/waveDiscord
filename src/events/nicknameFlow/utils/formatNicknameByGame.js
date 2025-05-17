const GAME_TYPES = require('@constants/gameTypes');
const formatRiotTag = require('./formatRiotTag');

/**
 * 게임 타입에 맞는 닉네임 포맷터
 * @param {string} gameType 
 * @param {string} rawNickname 
 * @returns {string}
 */
function formatNicknameByGame(gameType, rawNickname) {
    switch (gameType) {
        case GAME_TYPES.LEAGUE_OF_LEGENDS:
        case GAME_TYPES.VALORANT:
        case GAME_TYPES.TEAMFIGHT_TACTICS:
            return formatRiotTag(rawNickname);

        // TODO: 블리자드, 스팀 등 추가 가능

        default:
            return rawNickname.trim();
    }
}

module.exports = formatNicknameByGame;