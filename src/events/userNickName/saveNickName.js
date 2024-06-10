// saveNickName.js

const UserSettings = require('../../services/UserSettings');
const formatRiotTag = require('./nickNameModule/formatRiotTag');
const statusMessage = require('./nickNameModule/statusMessage');

const riotGames = ['leagueOfLegends', 'teamfightTactics', 'valorant'];

module.exports = async (interaction) => {
    try {
        // '업데이트 중' 메시지 전송
        await interaction.deferReply({ ephemeral: true });

        const userId = interaction.member.id;

        // customId, submitNickname_게임종류
        const customId = interaction.customId;

        // steam, leagueOfLegends 등등 ..
        const gameType = customId.split('_')[1];

        // 닉네임 가지고 오기
        let nickName = interaction.fields.getTextInputValue(customId);

        // 라이엇 게임즈 태그 체크
        if (riotGames.includes(gameType)) {
            nickName = formatRiotTag(nickName);
        };

        // 인스턴스 생성 및 닉네임 저장
        const userSettings = new UserSettings(userId);
        const status = await userSettings.saveNickName(gameType, nickName);

        // 닉네임 성공 여부에 따른 메세지 ★ 순서 중요
        const message = statusMessage(status);

        // 메세지 전송
        await interaction.editReply({ content: message, ephemeral: true });

    } catch (error) {
        console.error('saveNickName.js 에러 : ', error);
    };
};




// const axios = require('axios');
// const { steamApiKey } = require('../../../../config.json');
// const steamId = '76561198311685982';

// const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamApiKey}&steamids=${steamId}`;

// async function steamApiTest() {
//     try {
//         const response = await axios.get(url);


//         // console.log('response : ', response);

//         console.log('-----------------------------------------------------');

//         console.log('response.data : ', response.data);

//         console.log('-----------------------------------------------------');

//         console.log('response.data.response : ', response.data.response);

//         console.log('-----------------------------------------------------');

//         console.log('response.data.response.players : ', response.data.response.players);

//         return;

//         const playerName = response.data.response.players[0].personaname;
//         console.log(playerName);
//     } catch (error) {
//         console.log("Error: ", error.message); // 에러 메시지만 출력
//     }
// }