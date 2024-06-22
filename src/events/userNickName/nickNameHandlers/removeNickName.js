//  removeNickName.js , 등록된 닉네임 삭제

const UserSettings = require('../../../services/UserSettings');
const messageAutoDelete = require('../../../module/common/messageAutoDelete');
const statusMessage = require('../nickNameModules/statusMessage');

module.exports = async (interaction) => {
    try {
        // 유저 id
        const userId = interaction.member.id;

        // { 게임종류_닉네임, ... }
        const values = interaction.values;

        // 인스턴스 생성
        const userSettings = new UserSettings(userId);

        // 닉네임 삭제 및 상태 반환
        const status = await userSettings.removeNickname(values);

        // 작업 완료 메세지 전송
        const message = await interaction.update({
            content: statusMessage(status),
            components: [],
            ephemeral: true
        });

        messageAutoDelete(message);

    } catch (error) {
        console.error('removeNickName.js', error);
    };
};