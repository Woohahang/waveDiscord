const UserSettings = require('../../../../services/UserSettings');
const messageAutoDelete = require('../../../../module/common/messageAutoDelete');
const statusMessage = require('../../nickNameModules/statusMessage');

module.exports = async (interaction) => {
    try {
        // 유저 Id와 삭제할 게임과 닉네임 쌍을 가져옵니다.
        const userId = interaction.member.id;
        const gameAndNickname = interaction.values;

        // 유저 인스턴스를 생성 후, 닉네임을 삭제하고 결과 상태를 반환합니다.
        const userSettings = new UserSettings(userId);
        const status = await userSettings.removeNickname(gameAndNickname);

        // 상태 메시지를 포함한 결과 메시지를 업데이트합니다.
        const resultMessage = await interaction.update({
            content: statusMessage(status),
            components: [],
            ephemeral: true
        });

        // 20초 뒤 결과 메세지를 삭제합니다.
        messageAutoDelete(resultMessage);

    } catch (error) {
        console.error('removeNickName.js', error);
    };
};