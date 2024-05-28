// voiceJoinButton.js

const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

function voiceJoinButton() {
    try {
        const confirm = new ButtonBuilder()
            .setCustomId('watchVoiceChannel')
            .setLabel('관전')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder()
            .addComponents(confirm);

        return row;

    } catch (error) {
        console.error('voiceJoinButton.js 에러 : ', error);
    };
};

module.exports = { voiceJoinButton };