const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createAdminActionButtons() {
    const upDate = new ButtonBuilder()
        .setCustomId('upDateButton')
        .setLabel('업데이트')
        .setStyle(ButtonStyle.Primary)

    const contactSupport = new ButtonBuilder()
        .setLabel('문의 하기')
        .setURL('https://discord.gg/JWvCakpdmP')
        .setStyle(ButtonStyle.Link)

    return new ActionRowBuilder().addComponents(upDate, contactSupport);
};

module.exports = createAdminActionButtons;