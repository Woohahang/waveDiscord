const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('테스트')
        .setDescription('테스트용 개발자 명령어입니다.'),

    async execute(interaction) {
        try {

            const gameType = '리그오브레전드';
            const nickname = '페이커#kr1';

            // 두 문자열을 객체로 합침
            const gameData = {
                gameType: gameType,
                nickname: nickname
            };

            // object
            console.log(typeof (gameData));
            console.log('---');

            // 객체를 문자열로 변환
            const gameDataString = JSON.stringify(gameData);

            // string
            console.log(typeof (gameDataString));
            console.log('----')

            // 문자열을 다시 객체로 변환
            const parsedData = JSON.parse(gameDataString);
            console.log(parsedData.nickname);

        } catch (error) {
            console.log('테스트 명령어 실행 중 오류가 발생했습니다.', error);
        };

    }
};