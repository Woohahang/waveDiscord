const { SlashCommandBuilder } = require('discord.js');
const { developerId } = require('../../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('이모티콘테스트')
        .setDescription('이모티콘 테스트용 개발자 명령어입니다.'),

    async execute(interaction) {
        try {
            // 명령어를 실행한 사용자가 개발자인지 확인합니다.
            const userId = interaction.user.id;
            if (userId !== developerId) return;

            await interaction.reply('<:emoticontest:1339720320294060052>');

        } catch (error) {
            console.log('이모티콘 테스트 명령어 실행 중 오류가 발생했습니다.');
        };

    }
};