const EmojiSettings = require('../../../services/EmojiSettings');

async function emojiLoad(guild) {
    // try {
    //     // 이모지 인스턴스 생성
    //     const emojiSettings = new EmojiSettings(guild.id);

    //     // 이미 로드된 이모지 맵이 있는지 확인
    //     const emojiMap = EmojiSettings.getEmojiMap();
    //     if (emojiMap) return emojiMap;

    //     // 이모지 맵이 없다면 새로 로드
    //     const loadedEmojiMap = await EmojiSettings.loadEmojiMap(guild);
    //     return loadedEmojiMap;

    // } catch (error) {
    //     console.error('emojiLoad.js 예외 : ', error);
    //     return null;
    // };
};

module.exports = emojiLoad;