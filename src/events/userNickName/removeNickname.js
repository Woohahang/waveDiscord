//  removeNickname.js , 등록된 닉네임 삭제

const UserSettings = require('../../services/UserSettings');

module.exports = async (interaction) => {
    try {
        // 유저 id
        const userId = interaction.member.id;

        // { 게임종류_닉네임, ... }
        const values = interaction.values;

        // 인스턴스 생성
        const userSettings = new UserSettings(userId);

        // 닉네임 삭제 메서드
        await userSettings.removeNickName(values);

        // 완료 메세지 전송
        await interaction.update({
            content: '닉네임 삭제 완료',
            components: [],
            ephemeral: true
        });

    } catch (error) {
        console.error('removeNickname.js', error);
    };
};