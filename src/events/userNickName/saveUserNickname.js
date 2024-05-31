// saveUserNickName.js

const { menuSelectionResetter } = require('../../module/common/menuSelectionResetter');
const UserSettings = require('../../services/UserSettings');

function generateSaveMessage(nicknameSaveStatus) {
    let message;
    switch (nicknameSaveStatus) {
        case 'nicknameDuplicate':
            message = '중복 된 닉네임이 있습니다.';
            break;

        case 'nicknameLimitExceeded':
            message = '해당 게임은 저장할 수 있는 닉네임 개수를 초과했습니다.';
            break;

        case 'saveSuccess':
            message = '닉네임 등록 완료 !';
            break;

        default:
            message = '알 수 없는 오류로 인해 처리하지 못 했습니다.';
            break;
    };
    return message;
};

// 성공 여부 메세지 10초 뒤 삭제
function deleteEphemeralMessage(ephemeralMessage) {
    setTimeout(() => {
        ephemeralMessage.delete();
    }, 10_000);
};

module.exports = async (interaction) => {
    try {
        const userId = interaction.member.id;

        // customId === submitNickname_게임변수
        let customId = interaction.customId;

        // 모달 제출 값 가지고 오기
        const content = interaction.fields.getTextInputValue(customId);

        // customId === 게임변수 ex) kakao 또는 steam 등등
        customId = customId.split('_')[1];

        // 인스턴스 생성
        const userSettings = new UserSettings(userId);

        // 닉네임 저장 이후 성공여부 반환
        const nicknameSaveStatus = await userSettings.saveNickName(customId, content);

        // 닉네임 성공 여부에 따른 메세지
        const message = generateSaveMessage(nicknameSaveStatus);

        // 메세지 전송
        const ephemeralMessage = await interaction.reply({ content: message, ephemeral: true });

        // 성공 여부 메세지 10초 뒤 삭제
        deleteEphemeralMessage(ephemeralMessage);

        // 메뉴 초기화
        await menuSelectionResetter(interaction);

    } catch (error) {
        console.error('saveUserNickName.js 에러 : ', error);
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