// src/module/adminModules/adminButtion.js

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function adminButton() {

    const upDate = new ButtonBuilder()
        .setCustomId('upDate')
        .setLabel('업데이트')
        .setStyle(ButtonStyle.Primary)

    const contactSupport = new ButtonBuilder()
        .setLabel('문의 하기')
        .setURL('https://discord.gg/kuuWBEjun6')
        .setStyle(ButtonStyle.Link)

    const row = new ActionRowBuilder()
        .addComponents(upDate, contactSupport);

    return row;

}

module.exports = { adminButton }