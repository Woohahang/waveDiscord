const { SlashCommandBuilder } = require('discord.js');
const UserSettings = require('../../services/UserSettings');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('테스트')
        .setDescription('테스트 기능입니다.'),

    async execute(interaction) {
        // const userId = interaction.user.id;
        // if (userId !== '282793473462239232') return;

        // const userSettings = new UserSettings();

        // // 로드된 유저 수 확인
        // const userCount = userSettings.getUserCount();

        // // 결과를 로그로 출력하거나 인터랙션에 응답
        // console.log(`로드된 유저 수: ${userCount}`);
        console.log('슬래시 커맨드 테스트.');

    }
};