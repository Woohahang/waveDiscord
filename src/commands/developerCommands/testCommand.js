const logger = require('@utils/logger');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('테스트')
        .setDescription('테스트용 개발자 명령어입니다.'),

    async execute(interaction) {
        try {


        } catch (error) {
            logger.error('[test] 테스트 명령어 실행 중 오류 발생', {
                stack: error.stack
            });
        };

    }
};