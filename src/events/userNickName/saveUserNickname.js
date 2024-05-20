// saveUserNickName.js

const UserSettings = require('../../services/UserSettings');

module.exports = async (interaction) => {

    const customId = interaction.customId.split('-')[0]; // "-submitNickname" 부분 제거
    let content = interaction.fields.getTextInputValue(`${customId}-submitNickname`);

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

};