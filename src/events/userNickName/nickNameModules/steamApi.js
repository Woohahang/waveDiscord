// steamApi.js

const axios = require('axios');
const { steamApiKey } = require('../../../../../config.json');
const steamId = '76561198311685982';

async function steamApi(link) {
    try {
        const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamApiKey}&steamids=${steamId}`;

        const response = await axios.get(url);

        console.log('response.data.response.players : ', response.data.response.players);

        const playerName = response.data.response.players[0].personaname;
        console.log('playerName : ', playerName);

    } catch (error) {
        console.error('steamApi 예외 : ', error);
    };
};

module.exports = steamApi;


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