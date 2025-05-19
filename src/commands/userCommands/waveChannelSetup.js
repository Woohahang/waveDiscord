const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const STATE_KEYS = require('@constants/stateKeys');
const setupMainChannel = require('@modules/setup/handlers/setupMainChannel');
const setupAdminChannel = require('@modules/setup/handlers/setupAdminChannel');
const saveBasicGuildInfo = require('@modules/setup/handlers/saveBasicGuildInfo');
const getStateMessage = require('@shared/utils/stateMessage');
const logger = require('@utils/logger');

/**
 * Wave 전용 채널을 생성 및 업데이트하는 기능을 수행합니다.
*/
module.exports = {
    data: new SlashCommandBuilder()
        .setName('셋업')
        .setDescription('wave 전용 채널을 생성 및 업데이트 합니다.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // 관리자만 사용할 수 있도록 설정

    async execute(interaction) {

        const guild = interaction.guild;

        try {
            // 응답을 지연시키고, 사용자에게는 보이지 않도록 설정합니다.
            await interaction.deferReply({ ephemeral: true });

            // Wave 채널을 설정하는 함수입니다.
            await saveBasicGuildInfo(guild);
            await setupMainChannel(guild);
            await setupAdminChannel(guild);

            // 설정 완료 메시지를 사용자에게 응답합니다.
            await interaction.editReply({ content: getStateMessage(STATE_KEYS.SETUP_COMPLETE_MESSAGE), ephemeral: true });

        } catch (error) {
            logger.error('[waveChannelSetup] /셋업 커맨드 사용 오류', {
                guildId: guild.id,
                stack: error.stack
            })
        };
    }
};