const { GAME_TYPES } = require('@constants/gameTypes');
const STATE_KEYS = require('@constants/stateKeys');
const buildUserGameFields = require('@modules/voiceActivity/utiles/buildUserGameFields');
const UserSettings = require('@services/UserSettings');
const buildUserInfoEmbed = require('@modules/voiceActivity/utiles/buildUserInfoEmbed');
const sendStateMessage = require('@utils/discord/sendStateMessage');
const logger = require('@utils/logger');

/**
 * 사용자 정보를 기반으로 Discord 임베드를 생성하고 응답하는 함수
*/
module.exports = async (interaction) => {
    const member = interaction.member;

    try {
        // 유저 인스턴스 생성 및 유저 데이터 불러옵니다.
        const userSettings = new UserSettings(member.id);
        const userProfile = await userSettings.getProfile();

        // 유저 데이터가 없는 경우 삭제된 것으로 간주하고 안내 메시지를 보냅니다.
        if (!userProfile) return await sendStateMessage(interaction, STATE_KEYS.NO_USER_DATA);

        // 유저 데이터를 기반으로 embed 필드를 생성합니다.
        const allGameTypes = Object.values(GAME_TYPES);
        const fields = buildUserGameFields(userProfile, allGameTypes);
        if (!fields.length) return await sendStateMessage(interaction, STATE_KEYS.NO_NICKNAMES);

        // 마지막 업데이트 시간을 Date 객체로 변환합니다.
        const updatedAt = new Date(userProfile.updatedAt);

        // 유저 데이터를 바탕으로 임베드를 생성합니다.
        const embed = buildUserInfoEmbed(member, fields, updatedAt);

        // 생성된 임베드를 사용자에게 응답으로 전송합니다.
        await interaction.update({ embeds: [embed], components: [], ephemeral: true });

    } catch (error) {
        logger.error('[showUserInfo] 내 정보 조회 기능 사용 중 오류', {
            memberId: member.id,
            stack: error.stack
        })
    };
};