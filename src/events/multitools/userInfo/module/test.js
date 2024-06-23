const dioscrd = require('discord.js');
const axios = require('axios');
const { clientId, token, KoreanbotsClient } = require('../../../../../../config.json');
const { KoreanbotsClient } = require("koreanbots")

const { Koreanbots } = require("koreanbots")
const koreanbots = new Koreanbots({
    api: {
        token: KoreanbotsClient
    },
    clientID: clientId
});



module.exports = async (interaction) => {
    try {
        const memberId = interaction.member.id;


        console.log('koreanbots : ', koreanbots);

        // // 특정 유저가 특정 봇에 하트를 몇 번 눌렀는지 조회
        // const response = await axios.get(`https://koreanbots.dev/api/v2/bots/${clientId}/votes`, {
        //     headers: {
        //         'Authorization': `Bearer ${koreanbotsApiKey}`
        //     }
        // });


        // // 하트 데이터를 필터링하여 특정 멤버의 하트 수 확인
        // const userVotes = response.data.data.filter(vote => vote.userID === memberId);

        // if (userVotes.length > 0) {
        //     console.log(`멤버 ${memberId}는 봇에 ${userVotes.length}번 하트를 눌렀습니다.`);
        // } else {
        //     console.log(`멤버 ${memberId}는 아직 봇에 하트를 누르지 않았습니다.`);
        // }


    } catch (error) {
        console.error('test.js 예외 : ', error);
    };
};