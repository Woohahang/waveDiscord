// teamEmbedDelete

const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

function teamEmbedDeleteButton(isDisabled = true) {

    const confirm = new ButtonBuilder()
        .setCustomId('teamEmbedDeleteButton')
        .setLabel('삭제')
        .setStyle(ButtonStyle.Success)
        .setDisabled(isDisabled);

    const row = new ActionRowBuilder()
        .addComponents(confirm);

    return row;

};

module.exports = { teamEmbedDeleteButton };