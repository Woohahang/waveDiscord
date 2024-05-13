// src/module/adminModules/waveButton.js

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function waveButton() {
    const utilityTools = new ButtonBuilder()
        .setCustomId('multitoolsButton')
        .setLabel('편의 기능')
        .setStyle(ButtonStyle.Primary);

    const remove = new ButtonBuilder()
        .setCustomId('removeButton')
        .setLabel('닉네임 삭제')
        .setStyle(ButtonStyle.Success);

    const waveLink = new ButtonBuilder()
        .setLabel('Wave 초대하기')
        .setURL('https://discord.com/oauth2/authorize?client_id=1227561479801409566&permissions=8&scope=bot+applications.commands')
        .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder()
        .addComponents(remove, waveLink);

    return row;

};

module.exports = { waveButton };