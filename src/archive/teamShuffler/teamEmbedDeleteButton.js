// // teamEmbedDelete

// const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

// function teamEmbedDeleteButton(isDisabled = true) {

//     const teamReshuffleButton = new ButtonBuilder()
//         .setCustomId('teamReshuffleButton')
//         .setLabel('다시 섞기')
//         .setStyle(ButtonStyle.Success)
//         .setDisabled(isDisabled);

//     const EmbedDeleteButton = new ButtonBuilder()
//         .setCustomId('teamEmbedDeleteButton')
//         .setLabel('삭제')
//         .setStyle(ButtonStyle.Primary)
//         .setDisabled(isDisabled);

//     const row = new ActionRowBuilder()
//         .addComponents(teamReshuffleButton, EmbedDeleteButton);

//     return row;

// };

// module.exports = { teamEmbedDeleteButton };