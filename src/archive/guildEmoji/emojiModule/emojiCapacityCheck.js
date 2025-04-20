/**
 * 이 코드는 디스코드 개발자 API의 이모지 호출 방식 변경으로 인해 주석 처리되었습니다.
 *
 * 이 함수는 길드의 이모지 슬롯 용량을 체크하는 기능을 수행합니다.
*/
// function emojiCapacityCheck(guild, guildEmojis) {
//     // 길드에 등록 된 이모지 개수
//     const currentEmojiCount = guildEmojis.size;

//     // 길드의 부스트 티어 레벨에 따른 이모지 한도 확인
//     const premiumTier = guild.premiumTier;
//     let maximumEmojis;
//     switch (premiumTier) {
//         case 0:
//             maximumEmojis = 50;
//             break;
//         case 1:
//             maximumEmojis = 100;
//             break;
//         case 2:
//             maximumEmojis = 150;
//             break;
//         case 3:
//             maximumEmojis = 250;
//             break;
//         default:
//             maximumEmojis = 50; // 기본값
//     };

//     return currentEmojiCount < maximumEmojis;
// };

// module.exports = emojiCapacityCheck;