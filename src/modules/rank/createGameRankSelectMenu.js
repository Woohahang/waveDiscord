const GAME_DISPLAY_NAMES = require('@constants/gameDisplayNames');
const { GAME_TYPES } = require('@constants/gameTypes');
const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

function createGameRankSelectMenu() {
    const select = new StringSelectMenuBuilder()
        .setCustomId('select-game-rank')
        .setPlaceholder('선택하기!')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel(GAME_DISPLAY_NAMES[GAME_TYPES.LEAGUE_OF_LEGENDS])
                .setDescription('서버 소환사들의 랭크 정보를 확인하세요.')
                .setValue(GAME_TYPES.LEAGUE_OF_LEGENDS),

            // new StringSelectMenuOptionBuilder()
            //     .setLabel(GAME_DISPLAY_NAMES[GAME_TYPES.VALORANT])
            //     .setDescription('서버 요원들의 랭크 정보를 확인하세요.')
            //     .setValue(GAME_TYPES.VALORANT),
        );

    return new ActionRowBuilder().addComponents(select);
}

module.exports = createGameRankSelectMenu;