// userSearch.js

const { UserSelectMenuBuilder, ActionRowBuilder } = require('discord.js');


async function userSearch(interaction) {

    const userSelect = new UserSelectMenuBuilder()
        .setCustomId('users')
        .setPlaceholder('Select multiple users.')
        .setMinValues(1)
        .setMaxValues(5)

    const row = new ActionRowBuilder()
        .addComponents(userSelect);

    await interaction.reply({
        content: '테스트',
        components: [row],
        ephemeral: true
    });

};

module.exports = { userSearch };

/*

.addDefaultUsers : 기본으로 선택 됨

*/