// saveUserNickName.js

const UserSettings = require('../../services/UserSettings');

module.exports = async (interaction) => {
    try {
        // customId === submitNickname_게임변수
        let customId = interaction.customId;

        // 모달 제출 값 가지고 오기
        const content = interaction.fields.getTextInputValue(customId);

        // customId === 게임변수 ex) kakao 또는 steam 등등
        customId = customId.split('_')[1];

        // 유저 인스턴스 생성
        const userSettings = new UserSettings(interaction.member.user.id);

        // 유저 데이터 불러오기
        await userSettings.loadOrCreate();

        // 닉네임 저장
        const nickNameSave = await userSettings.saveNickName(customId, content);

        // 닉네임 저장 성공 여부
        if (nickNameSave) {
            await interaction.reply({ content: "닉네임 등록 완료 !", ephemeral: true });
        } else {
            await interaction.reply({ content: "해당 항목의 닉네임 개수를 초과했습니다.", ephemeral: true });
        };
    } catch (error) {
        console.error('saveUserNickName.js 에러 : ', error);
        await interaction.reply({ content: "문제가 발생했습니다. 관리자님, 업데이트 버튼을 눌러주세요.", ephemeral: true });
    };
};