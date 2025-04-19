const UserSettings = require('../../../services/UserSettings');
const { alreadyDeleted } = require('./module/resultMessage');
const buildUserDataFields = require('../../../shared/embed/buildUserDataFields');
const buildUserInfoEmbed = require('../../../shared/embed/buildUserInfoEmbed');

/**
 * 사용자 정보를 기반으로 Discord 임베드를 생성하고 응답하는 함수
*/
module.exports = async (interaction) => {
    try {
        const member = interaction.member;

        // 유저 인스턴스 생성 및 유저 데이터 불러옵니다.
        const userSettings = new UserSettings(member.id);
        const userData = await userSettings.loadUserData();

        // 유저 데이터가 없는 경우 삭제된 것으로 간주하고 안내 메시지를 보냅니다.
        if (!userData) {
            await interaction.update({ content: alreadyDeleted, components: [], ephemeral: true });
            return;
        };

        // 유저 데이터를 기반으로 embed 필드를 생성합니다.
        const fields = buildUserDataFields(userData);
        if (!fields) return;

        // 마지막 업데이트 시간을 Date 객체로 변환합니다.
        const updatedAt = new Date(userData.updatedAt);

        // 유저 데이터를 바탕으로 임베드를 생성합니다.
        const embed = buildUserInfoEmbed(member, fields, updatedAt);

        // 생성된 임베드를 사용자에게 응답으로 전송합니다.
        await interaction.update({ embeds: [embed], components: [], ephemeral: true });

    } catch (error) {
        console.error('viewUserInfo.js 예외 : ', error);
    };
};