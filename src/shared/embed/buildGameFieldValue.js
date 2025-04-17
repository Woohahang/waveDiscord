const formatNicknameLine = require('./formatNicknameLine');

/**
 * 주어진 게임과 닉네임 목록을 기반으로, 각 닉네임 라인을 형식화하여
 * 디스코드 임베드 필드에 들어갈 문자열로 반환합니다.
 *
 * @param {string} game - 게임 키 (예: 'steam', 'overWatchTwo')
 * @param {Array<Object|string>} nicknames - 유저가 등록한 닉네임 배열
 * @returns {string} - 형식화된 닉네임 라인들을 줄바꿈(\n)으로 연결한 문자열
 */
function buildGameFieldValue(game, nicknames) {
    return nicknames.map(nickname => formatNicknameLine(game, nickname)).join('\n');
}

module.exports = buildGameFieldValue;