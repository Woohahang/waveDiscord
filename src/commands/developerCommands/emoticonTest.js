const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const { developerId } = require('../../../../config.json');
const fetchLeagueOfLegendsTier = require('../../wip/fetchLeagueOfLegendsTier');
const saveLeagueOfLegendsTier = require('../../wip/saveLeagueOfLegendsTier');
const UserSettings = require('../../services/UserSettings');
const migrateData = require('../../wip/migrateData');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('테스트')
        .setDescription('테스트용 개발자 명령어입니다.'),

    async execute(interaction) {
        try {

        } catch (error) {
            console.log('테스트 명령어 실행 중 오류가 발생했습니다.', error);
        };

    }
};