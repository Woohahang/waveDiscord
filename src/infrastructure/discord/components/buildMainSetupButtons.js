const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const WAVE_INVITE_URL =
    "https://discord.com/oauth2/authorize?client_id=1227561479801409566&permissions=8&scope=bot+applications.commands"

function buildMainSetupButtons() {
    const myInfoButton = new ButtonBuilder()
        .setCustomId('multitoolsButton')
        .setLabel('내 정보')
        .setStyle(ButtonStyle.Primary);

    const removeNicknameButton = new ButtonBuilder()
        .setCustomId('removeButton')
        .setLabel('닉네임 삭제')
        .setStyle(ButtonStyle.Success);

    const inviteWaveButton = new ButtonBuilder()
        .setLabel('Wave 초대하기')
        .setURL(WAVE_INVITE_URL)
        .setStyle(ButtonStyle.Link);

    return new ActionRowBuilder().addComponents(
        myInfoButton,
        removeNicknameButton,
        inviteWaveButton
    );
};

module.exports = buildMainSetupButtons;