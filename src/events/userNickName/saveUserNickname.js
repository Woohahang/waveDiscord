// saveUserNickName.js

const UserSettings = require('../../services/UserSettings');
const { menuSelectionResetter } = require('../../module/common/menuSelectionResetter');

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

module.exports = async (interaction) => {
    try {
        const userId = interaction.member.id;

        // customId === submitNickname_게임변수
        let customId = interaction.customId;

        // 모달 제출 값 가지고 오기
        const content = interaction.fields.getTextInputValue(customId);

        // customId === 게임변수 ex) kakao 또는 steam 등등
        customId = customId.split('_')[1];

        // 닉네임 DB에 저장 ex) id, loL, 끼매누
        let nicknameSaveStatus = await UserSettings.saveNickName(userId, customId, content);

        // 닉네임 성공 여부에 따른 메세지
        const message = generateSaveMessage(nicknameSaveStatus);

        // 메세지 전송
        await interaction.reply({ content: message, ephemeral: true });

        // 메뉴 초기화
        await menuSelectionResetter(interaction);

    } catch (error) {
        console.error('saveUserNickName.js 에러 : ', error);
        await interaction.reply({ content: "문제가 발생했습니다. 관리자님, 업데이트 버튼을 눌러주세요.", ephemeral: true });
    };
};