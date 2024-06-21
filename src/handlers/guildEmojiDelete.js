const EmojiSettings = require('../services/EmojiSettings');

module.exports = async (emoji) => {
    const guildId = emoji.guild.id;

    const emojiSettings = new EmojiSettings(guildId);
    emojiSettings.clearEmojiMap();
    console.log('이모지 맵 삭제');
};