// isValidEmojis.js

const filterOptions = require('../../../../module/data/filterOptions');

/* 이모지 누락 체크 */
function isValidEmojis(guildData, guild) {
    const trueValueGames = filterOptions(guildData, true);

    for (const game of trueValueGames) {
        if (!guild.emojis.cache.some(emoji => emoji.name === 'wave_' + game)) {
            return false;
        };
    };

    return true;
};

module.exports = isValidEmojis;