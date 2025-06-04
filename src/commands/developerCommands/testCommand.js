const createGameRankSelectMenu = require('@modules/rank/createGameRankSelectMenu');
const logger = require('@utils/logger');
const { SlashCommandBuilder } = require('discord.js');

const message =
    '## 게임 선택하기 🎮\n' +
    '> * 서버 친구들의 티어가 궁금하다면?\n' +
    '> * 아래에서 게임을 골라보세요! **Wave**가 바로 보여드립니다.';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('테스트')
        .setDescription('테스트용 개발자 명령어입니다.'),

    async execute(interaction) {
        try {
            const rankSelectMenuRow = createGameRankSelectMenu();

            await interaction.reply({ content: message, components: [rankSelectMenuRow], ephemeral: true })

        } catch (error) {
            logger.error('[test] 테스트 커맨드 명령어 실행 중 오류 발생', {
                stack: error.stack
            });
        };

    }
};