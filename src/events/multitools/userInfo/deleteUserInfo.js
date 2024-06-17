const UserSettings = require('../../../services/UserSettings');
const { deleteSuccess, alreadyDeleted, deleteError } = require('./module/resultMessage');

function resultMessage(deleteResult) {
    try {
        switch (deleteResult) {
            case 'deleteSuccess':
                return deleteSuccess;

            case 'alreadyDeleted':
                return alreadyDeleted;

            case 'deleteError':
            default:
                return deleteError;
        };
    } catch (error) {
        console.log('deleteResult : ', deleteResult);
        console.log('deleteUserInfo.js 의 resultMessage 예외 : ', error);
        throw error;
    };
};

module.exports = async (interaction) => {
    try {
        const userId = interaction.user.id;

        // 유저 인스턴스 생성 이후 유저 정보 삭제
        const userSettings = new UserSettings(userId);
        const deleteResult = await userSettings.deleteUserInfo();

        // 결과에 맞는 메세지 전송
        await interaction.update({ content: resultMessage(deleteResult), components: [], ephemeral: true });

    } catch (error) {
        console.error('deleteUserInfo.js 예외 : ', error);
    };
};