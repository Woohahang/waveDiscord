const UserSettings = require('@services/UserSettings');
const getStateMessage = require('@shared/utils/stateMessage');
const logger = require('@utils/logger');

/**
 * 사용자 정보 삭제 인터랙션을 처리합니다.
 * 
 * 1. 사용자 ID를 기준으로 UserSettings 인스턴스를 생성하고,
 * 2. 사용자 정보를 삭제한 뒤,
 * 3. 상태 메시지를 Discord에 전송합니다.
 * 
 * @param {import('discord.js').ChatInputCommandInteraction} interaction - Discord 상호작용 객체
 */
module.exports = async (interaction) => {

    const userId = interaction.user.id;

    try {
        // 유저 인스턴스 생성 이후 유저 정보 삭제
        const userSettings = new UserSettings(userId);
        const resultKey = await userSettings.deleteUser();

        // 결과에 맞는 메세지 전송
        await interaction.update({ content: getStateMessage(resultKey), components: [], ephemeral: true });

    } catch (error) {
        logger.error('[deleteUserInfo] 사용자 정보 삭제 명령 처리 중 오류', {
            userId,
            stack: error.stack
        })
    };
};