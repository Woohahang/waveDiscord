const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const updateLoLTiers = require('../../events/ranking/updateLoLTiers');
const updateUserLoLTier = require('../../events/ranking/modules/updateUserLoLTier');
const UserSettings = require('../../services/UserSettings');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('테스트')
        .setDescription('테스트용 개발자 명령어입니다.'),

    async execute(interaction) {
        try {
            // const userData = await userSettings.loadUserData();

            // const users = await UserSettings.getUsersForLoLTierUpdate();

            // for (const user of users) {
            //     console.log(user);
            //     await updateUserLoLTier(user);
            // }

        } catch (error) {
            console.log('테스트 명령어 실행 중 오류가 발생했습니다.', error);
        };

    }
};