// isValidEmojis.js

const filterOptions = require('../../../../module/data/filterOptions');

/**
 * 이모지 유효성 검사 함수
 * @param {Object} guildData - 길드 데이터
 * @param {Object} guild - Discord 길드 객체
 * @returns {boolean} - 누락 된 이모지가 존재하면 false, 그렇지 않으면 true
 */

/* 이모지 누락 체크 */
function isValidEmojis(guildData, guild) {
    // 활성화된 게임 메뉴를 가져옵니다.
    const trueValueGames = filterOptions(guildData, true);

    // 활성화된 게임 메뉴에 해당하는 이모지가 길드에 있는지 확인합니다.
    for (const game of trueValueGames) {
        if (!guild.emojis.cache.some(emoji => emoji.name === 'wave_' + game)) {
            return false;
        };
    };

    return true;
};

module.exports = isValidEmojis;