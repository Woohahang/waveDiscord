// ephemeralMessageDelete.js

// 10초
const TEN_SECONDS = 5_000;

// 10초 뒤 메세지 삭제
// const ephemeralMessageAutoDelete = (ephemeralMessage) => {
//     try {
//         // 10초 뒤에 메시지 삭제
//         setTimeout(() => {
//             try {
//                 ephemeralMessage.delete();
//             } catch (innerError) {
//                 console.error('메시지 삭제 중 에러 발생', innerError);
//             }
//         }, TEN_SECONDS);
//     } catch (error) {
//         console.error('ephemeralMessageAutoDelete 에러', error);
//     }
// };

// module.exports = ephemeralMessageAutoDelete;