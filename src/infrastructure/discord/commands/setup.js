const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const createSetupChannelSelectRows = require('../components/createSetupChannelSelectRows.js');
const createSetupConfirmButton = require('../components/createSetupConfirmButton.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('셋업')
        .setDescription('Wave 기본 채널을 설정합니다.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),

    // 선택 항목 두 개
    // MAIN 하나 선택하면 저장
    // ADMIN 또 하나 선택하면 저장
    // 버튼에 UI 전송

    async execute(interaction, dependencies) {
        const rows = createSetupChannelSelectRows();
        const confirmRow = createSetupConfirmButton();

        try {
            await interaction.reply({
                content: [
                    'Wave 셋업을 시작합니다.',
                    '메인 채널과 관리자 채널을 선택한 뒤 확인 버튼을 눌러주세요.',
                ].join('\n'),
                components: [...rows, confirmRow],
                ephemeral: true,
            });
        } catch (error) {
            console.error('셋업 명령어 실행 중 오류 발생:', error);
            await interaction.reply({
                content: '셋업을 시작하는 중 오류가 발생했습니다. 다시 시도해주세요.',
                ephemeral: true,
            });
        }
    },
};