
/**
 * 이 코드는 디스코드 개발자 API의 이모지 호출 방식 변경으로 인해 주석 처리되었습니다.
 *
 * 이 함수는 길드 메뉴에 없는 이모지들을 삭제하는 기능을 수행합니다.
*/
// async function emojiDelete(guild, guildEmojis, trueValueKeys) {
//     try {
//         // Wave 이모지 중에, 길드에서 설정한 true 게임이 아닌 모든 이모지들
//         const deleteEmojis = guildEmojis.filter(emoji =>
//             emoji.author.id === clientId &&
//             !trueValueKeys.includes(emoji.name.split('_')[1])
//         );

//         // 이모지 제거
//         const deletePromises = deleteEmojis.map(emoji =>
//             guild.emojis.delete(emoji.id)
//                 .then(() => console.log('이모지 삭제 : ', emoji.name))
//                 .catch((error) => {
//                     console.error('이모지 삭제 실패 : ', emoji.name);
//                     throw error; // 여기서 에러를 던지면, Promise.all에 의해 catch됩니다.
//                 })
//         );

//         await Promise.all(deletePromises);

//     } catch (error) {
//         console.error('emojiDelete.js 에러 : ', error);
//         throw error;
//     };
// };

// module.exports = emojiDelete;