// // enableButtonsLater.js
// const { teamEmbedDeleteButton } = require('../teamEmbedDeleteButton');

// // 버튼을 5초 뒤 활성화
// async function enableButtonsLater(sentMessage, embed) {
//     try {
//         setTimeout(async () => {
//             const updatedRow = teamEmbedDeleteButton(false); // false를 전달하여 버튼을 활성화
//             await sentMessage.edit({
//                 embeds: [embed],
//                 components: [updatedRow]
//             });
//         }, 5000);
//     } catch (error) {
//         console.error('enableButtonsLater.js 에러', error);
//     };
// };

// module.exports = { enableButtonsLater };