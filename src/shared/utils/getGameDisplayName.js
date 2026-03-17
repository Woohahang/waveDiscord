const GAME_DISPLAY_NAMES = require('../constants/gameDisplayNames');

/**
 * 게임 타입에 해당하는 표시 이름을 반환합니다.
 *
 * @param {string} gameType
 * @param {string} locale
 * @returns {string}
*/
function getGameDisplayName(gameType, locale) {
    if (!locale)
        throw new Error('[getGameDisplayName] locale is required');

    if (!GAME_DISPLAY_NAMES[locale])
        throw new Error(`[getGameDisplayName] Unsupported locale: "${locale}"`);

    const name = GAME_DISPLAY_NAMES[locale][gameType];

    if (!name)
        throw new Error(`[getGameDisplayName] Unsupported gameType: "${gameType}", locale: "${locale}"`);

    return name;
}

module.exports = getGameDisplayName;