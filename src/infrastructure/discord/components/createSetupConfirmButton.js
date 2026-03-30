const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = function createSetupConfirmButton() {
    const button = new ButtonBuilder()
        .setCustomId('setup:confirm')
        .setLabel('셋업 완료')
        .setStyle(ButtonStyle.Primary);

    return new ActionRowBuilder().addComponents(button);
};