const filterOptions = require('../../../module/data/filterOptions');

function checkMissingEmojis(guildData, emojiData) {
    const expectedEmojis = filterOptions(guildData, true);
    const missingEmojis = expectedEmojis.filter(expectedEmoji =>
        !emojiData.some(emoji => emoji.name === 'wave_' + expectedEmoji)
    );
    return missingEmojis;
}

module.exports = checkMissingEmojis;