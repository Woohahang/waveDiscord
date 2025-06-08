const { VALID_GAME_KEYS } = require('@constants/gameTypes');
const InvalidGameTypeError = require('@utils/errors/InvalidGameTypeError');

/**
 * 주어진 게임 타입이 유효한지 확인하고, 아니면 에러를 throw합니다.
 * @param {string} gameType
 * @param {string} userId
 */
function validateGameType(gameType, userId) {
    if (!VALID_GAME_KEYS.includes(gameType)) {
        throw new InvalidGameTypeError(gameType, userId);
    }
}

module.exports = validateGameType;