const emojiIds = require('../../constants/emojiIds');

/**
 * 게임 이름에 해당하는 이모지 ID를 반환합니다.
 *
 * @param {string} gameName - 게임 키 값
 * @returns {string|null} 이모지 ID 또는 null
 */
function emojiId(gameName) {
    return emojiIds[gameName] || null;
}

module.exports = emojiId;