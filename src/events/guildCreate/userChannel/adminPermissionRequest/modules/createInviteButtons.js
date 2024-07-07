const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

function createInviteButtons() {
    const inviteButton = new ButtonBuilder()
        .setLabel('Wave 초대하기')
        .setURL('https://discord.com/oauth2/authorize?client_id=1227561479801409566&permissions=8&scope=bot+applications.commands')
        .setStyle(ButtonStyle.Link);

    const inquiryButton = new ButtonBuilder()
        .setLabel('문의하기')
        .setURL('https://discord.gg/JWvCakpdmP')
        .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder()
        .addComponents(inviteButton, inquiryButton);

    return row;
};

module.exports = createInviteButtons;