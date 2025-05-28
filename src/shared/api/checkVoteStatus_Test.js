// const axios = require('axios');
// const waveId = '1227561479801409566';

// /**
//  * @description
//  * 이 모듈은 디스코드 인터랙션(interaction)을 받아,
//  * Koreanbots API를 통해 해당 유저가 Wave 봇에 투표했는지를 확인합니다.
//  *
//  *
//  * @todo
//  * - 유저의 누적 투표 횟수를 저장하고, 투표 등급 시스템 구현 예정
//  * - 등급별 혜택 제공
// */
// module.exports = async (interaction) => {
//     try {
//         // 상호작용한 유저의 ID를 가져옵니다.
//         const userId = interaction.user.id;

//         // 봇 정보를 가져옵니다.
//         // const botInfoUrl = `https://koreanbots.dev/api/v2/bots/${waveId}/`;
//         // const botInfoResponse = await axios.get(botInfoUrl, {
//         //     headers: {
//         //         'Authorization': KoreanbotsClient
//         //     }
//         // });
//         // console.log(botInfoResponse.data.code === 200 ? '봇 정보 요청 성공' : '봇 정보 요청 실패');

//         // 유저 봇 투표 여부 확인을 요청합니다.
//         const voteCheckUrl = `https://koreanbots.dev/api/v2/bots/${waveId}/vote?userID=${userId}`;
//         const voteCheckResponse = await axios.get(voteCheckUrl, {
//             headers: {
//                 'Authorization': KoreanbotsClient,
//                 'Content-Type': 'application/json'
//             }
//         });

//         const voted = voteCheckResponse.data.data.voted;
//         const lastVote = voteCheckResponse.data.data.lastVote;

//         console.log('lastVote : ', lastVote);

//         const lastVoteDate = new Date(lastVote);
//         const formattedDate = `${lastVoteDate.getFullYear()}-${(lastVoteDate.getMonth() + 1).toString().padStart(2, '0')}-${lastVoteDate.getDate().toString().padStart(2, '0')} ${lastVoteDate.getHours().toString().padStart(2, '0')}:${lastVoteDate.getMinutes().toString().padStart(2, '0')}:${lastVoteDate.getSeconds().toString().padStart(2, '0')}`;
//         console.log('마지막 누른 시간 : ', formattedDate);

//     } catch (error) {
//         console.error('test.js 예외 : ', error.response ? error.response.data : error.message);
//     }
// };