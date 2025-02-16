// const fs = require('fs');
// const path = require('path');

/**
 * 이 코드는 디스코드 개발자 API의 이모지 호출 방식 변경으로 인해 주석 처리되었습니다.
 *
 * 이 함수는 길드에 사용될 이모지를 등록하는 기능을 수행합니다.
*/
// async function emojiRegister(guild, guildEmojis, trueValueKeys) {
//     try {
//         // 이미 등록 된 이모지들
//         const filterEmoji = guildEmojis
//             .filter(guildEmoji => trueValueKeys.includes(guildEmoji.name.split('_')[1]))
//             .map(emoji => emoji.name.split('_')[1]);

//         // 이모지 등록 작업 준비
//         const emojiPromises = trueValueKeys.map(async trueGame => {
//             const imagePath = path.join(__dirname, '../../../../../register/emoji/wave_' + trueGame + '.png');
//             if (fs.existsSync(imagePath) && !filterEmoji.includes(trueGame)) {

//                 await guild.emojis.create({ attachment: imagePath, name: 'wave_' + trueGame })
//                     .then(() => {
//                         console.log(`이모지가 서버에 추가되었습니다: wave_${trueGame}`);
//                     })
//                     .catch(error => {
//                         console.error(`이모지 등록 실패 wave_${trueGame} : ${error}`);
//                     });

//             };
//         });

//         // 모든 이모지 등록 작업 실행
//         await Promise.all(emojiPromises);

//     } catch (error) {
//         console.error('emojiRegister.js 에러 : ', error);
//     };
// };

// module.exports = emojiRegister;

/*
.map() 안에서 async, await 을 사용한 이유
 - 함수를 사용하여 각 이모지 생성 작업을 비동기적으로 처리하기 위해.
*/