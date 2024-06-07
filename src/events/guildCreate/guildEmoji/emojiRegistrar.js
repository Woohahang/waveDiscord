// emojiRegistrar.js

const GuildSettings = require('../../../services/GuildSettings');
const filterOptions = require('../../../module/data/filterOptions');
const emojiRegister = require('./module/emojiRegister');

/* 길드에 이모지 등록 */
module.exports = async (guild) => {
    try {
        // 길드 인스턴스 생성 및 불러오기
        const guildSettings = new GuildSettings(guild.id);
        const guildData = await guildSettings.loadOrCreate();

        // 길드 이모지 패치.
        const guildEmojis = await guild.emojis.fetch();

        // 길드에 나타나도록 설정 된 게임 이름들
        const trueValueKeys = filterOptions(guildData, true);

        // 이모지 등록
        emojiRegister(guild, guildEmojis, trueValueKeys);

    } catch (error) {
        console.error('emojiRegistrar.js 에러 : ', error);
    };
};