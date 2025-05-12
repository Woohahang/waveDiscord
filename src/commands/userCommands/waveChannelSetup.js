const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

const setupMainChannel = require('@module/setup/setupMainChannel');
const setupAdminChannel = require('@module/setup/setupAdminChannel');

const SETUP_COMPLETE_MESSAGE =
    '## 셋업 완료' + '\n' +
    '> * **Wave 채널**과 **Wave 관리자 채널**의 설정이 완료 되었습니다.' + '\n' +
    '> * 이 명령어는 관리자만 사용할 수 있습니다.';

/**
 * Wave 전용 채널을 생성 및 업데이트하는 기능을 수행합니다.
*/
module.exports = {
    data: new SlashCommandBuilder()
        .setName('셋업')
        .setDescription('wave 전용 채널을 생성 및 업데이트 합니다.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // 관리자만 사용할 수 있도록 설정

    async execute(interaction) {
        try {
            const guild = interaction.guild;

            // 응답을 지연시키고, 사용자에게는 보이지 않도록 설정합니다.
            await interaction.deferReply({ ephemeral: true });

            // Wave 채널을 설정하는 함수입니다.
            await setupMainChannel(guild);
            await setupAdminChannel(guild);

            // 설정 완료 메시지를 사용자에게 응답합니다.
            await interaction.editReply({ content: SETUP_COMPLETE_MESSAGE, ephemeral: true });

        } catch (error) {
            console.error('Wave 전용 채널을 생성 및 업데이트 도중 오류가 발생했습니다. :', error);
        };
    }
};