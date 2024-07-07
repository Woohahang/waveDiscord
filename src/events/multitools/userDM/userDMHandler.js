// 의도, 유저 임베드 색상 선택

const UserSettings = require('../../../services/UserSettings');

module.exports = async (interaction) => {
    try {
        const userId = interaction.member.id;
        const userSettings = new UserSettings(userId);
        const userData = await userSettings.loadUserData();



    } catch (error) {
        console.error('userDMHander.js 예외 : ', error);
    };
};