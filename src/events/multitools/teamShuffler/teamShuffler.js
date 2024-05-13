// teamShuffler.js

const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

function teamShufflerMenu() {

    const multitoolsMenu = new StringSelectMenuBuilder()
        .setCustomId('teamShufflerMenu')
        .setPlaceholder('몇 팀으로 나눌까요?')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('두 팀으로 나누기')
                .setDescription('현재 인원에서 두 팀으로 나눌게요')
                .setValue('2_'),
            new StringSelectMenuOptionBuilder()
                .setLabel('세 팀으로 나누기')
                .setDescription('현재 인원에서 세 팀으로 나눌게요')
                .setValue('3_'),
            new StringSelectMenuOptionBuilder()
                .setLabel('직접 입력하기')
                .setDescription('메뉴에 없나요? 클릭해주세요.')
                .setValue('0_'),
        );

    return row = new ActionRowBuilder()
        .addComponents(multitoolsMenu);

};

async function teamShuffler(interaction) {

    await interaction.update({
        components: [teamShufflerMenu()],
        ephemeral: true
    });

};

module.exports = { teamShuffler };