const Discord = require('discord.js');
const axios = require('axios');
const { waveId, token, KoreanbotsClient } = require('../../../../../../config.json');

module.exports = async (interaction) => {
    try {
        // 버튼을 누른 유저의 ID를 가져옵니다.
        const userId = interaction.user.id;

        // Koreanbots API에 요청을 보냅니다.
        const response = await axios.get(`https://koreanbots.dev/api/v2/bots/${waveId}/vote?userID=${userId}`, {
            headers: {
                Authorization: KoreanbotsClient
            },
        });

        console.log(response.data);

    } catch (error) {
        console.error('test.js 예외 : ', error.response ? error.response.data : error.message);
    }
};
