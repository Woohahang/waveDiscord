const isAdmin = require('@shared/utils/isAdmin');
const saveBasicGuildInfo = require('@modules/guildSetup/handlers/saveBasicGuildInfo'); // 길드 오너 ID 및 길드 이름 업데이트
const setupMainChannel = require('@modules/guildSetup/handlers/setupMainChannel');
const setupAdminChannel = require('@modules/guildSetup/handlers/setupAdminChannel');
const logger = require('@utils/logger');
const STATE_KEYS = require('@constants/stateKeys');
const ERROR_KEY = require('@constants/errorKeys');
const getStateMessage = require('@shared/utils/stateMessage');

module.exports = async (interaction) => {

    const guild = interaction.guild;

    try {
        // 사용자 권한 체크
        if (!isAdmin(interaction.member))
            return await interaction.reply({ content: '관리자 메뉴에 접근할 권한이 없습니다.', ephemeral: true });

        // '업데이트 중' 메시지 전송
        await interaction.deferReply({ ephemeral: true });

        const resultKey = await Promise.all([
            saveBasicGuildInfo(guild),
            setupAdminChannel(guild),
            setupMainChannel(guild)
        ])
            .then(() => STATE_KEYS.GUILD_UPDATE_SUCCESS)
            .catch((error) => {
                logger.error('[onGuildUpdateButtonPressed] 길드 업데이트 실패', {
                    guildId: guild.id,
                    stack: error.stack
                });
                return ERROR_KEY.GUILD_UPDATE_FAILED;
            })

        await interaction.editReply({ content: getStateMessage(resultKey), components: [], ephemeral: true });

    } catch (error) {
        logger.error('[onGuildUpdateButtonPressed] 길드 업데이트 중 오류', {
            guildId: guild.id,
            stack: error.stack
        })
    };
};