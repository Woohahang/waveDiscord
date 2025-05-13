const isBotAdmin = require('@utils/discord/isBotAdmin');
const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('테스트')
        .setDescription('테스트용 개발자 명령어입니다.'),

    async execute(interaction) {
        try {

            console.log(isBotAdmin(interaction.guild));

        } catch (error) {
            console.log('테스트 명령어 실행 중 오류가 발생했습니다.', error);
        };

    }
};