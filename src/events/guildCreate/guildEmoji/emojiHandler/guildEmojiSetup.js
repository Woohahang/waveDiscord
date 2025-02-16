// const GuildSettings = require('../../../../services/GuildSettings');
// const filterOptions = require('../../../../module/data/filterOptions');
// const emojiRegister = require('../emojiModule/emojiRegister');

/*
 * 이 코드는 디스코드 개발자 API의 이모지 호출 방식 변경으로 인해 주석 처리되었습니다.
 *
 * 원래 이 코드는 길드에 이모지를 등록하는 기능을 수행했습니다.
 */
// module.exports = async (guild) => {
//     try {
//         // 길드 인스턴스 생성 및 불러오기
//         const guildSettings = new GuildSettings(guild.id);
//         const guildData = await guildSettings.loadOrCreate();

//         // 길드 이모지 패치.
//         const guildEmojis = await guild.emojis.fetch();

//         // 길드에 나타나도록 설정 된 게임 이름들
//         const trueValueKeys = filterOptions(guildData, true);

//         // 이모지 등록
//         emojiRegister(guild, guildEmojis, trueValueKeys);

//     } catch (error) {
//         console.error('emojiRegistrar.js 에러 : ', error);
//     };
// };