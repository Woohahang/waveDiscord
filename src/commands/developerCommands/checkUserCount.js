const { SlashCommandBuilder } = require('discord.js');
const UserSettings = require('../../services/UserSettings');
const { developerId } = require('../../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('유저확인')
        .setDescription('현재 로드된 유저의 수를 확인합니다.'),

    async execute(interaction) {
        try {
            // 명령어를 실행한 사용자가 개발자인지 확인합니다.
            const userId = interaction.user.id;
            if (userId !== developerId) return;

            // 인스턴스 생성 및 로드된 유저 수를 가져옵니다.
            const userSettings = new UserSettings();
            const userCount = userSettings.getUserCount();

            // 디스코드 채팅에 비공개 메시지로 응답합니다.
            await interaction.reply({
                content: `현재 로드된 유저 수는 ${userCount}명입니다.`,
                ephemeral: true
            });

        } catch (error) {
            console.error('checkUserCount.js 예외 : ', error);
        };

    }
};