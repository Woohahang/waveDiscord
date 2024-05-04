//  src/module/gameMenuLoader.js

const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

async function gameMenuLoader() {
    let gameMenuSelect = new StringSelectMenuBuilder()
        .setCustomId('gameMenu')
        .setPlaceholder('닉네임 등록 !')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('Steam')
                .setDescription('스팀 친구 코드 또는 스팀 프로필 주소')
                .setValue('steam'),
            new StringSelectMenuOptionBuilder()
                .setLabel('Riot Games')
                .setDescription('라이엇 게임즈 닉네임')
                .setValue('riotGames'),
            new StringSelectMenuOptionBuilder()
                .setLabel('Steam Battle Grounds')
                .setDescription('스팀 배틀 그라운드 닉네임')
                .setValue('steamBG'),
            new StringSelectMenuOptionBuilder()
                .setLabel('KaKao Battle Grounds')
                .setDescription('카카오 배틀 그라운드 닉네임')
                .setValue('kaKaoBG'),
            new StringSelectMenuOptionBuilder()
                .setLabel('OVERWATCH 2')
                .setDescription('오버워치 2')
                .setValue('overWatchTwo'),
        );

    let row = new ActionRowBuilder()
        .addComponents(gameMenuSelect);

    return row;

}

module.exports = { gameMenuLoader };