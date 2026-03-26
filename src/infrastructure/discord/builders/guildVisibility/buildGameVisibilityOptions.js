const { StringSelectMenuOptionBuilder } = require('discord.js');
const getGameDisplayName = require('@shared/utils/getGameDisplayName');

const suffix = {
    showMenu: '보이게 할 게임을 선택해주세요.',
    hideMenu: '숨길 게임을 선택해주세요.',
}

function buildGameVisibilityOptions(actionType, gameTypes) {
    return gameTypes.map((gameType) =>
        new StringSelectMenuOptionBuilder()
            .setLabel(getGameDisplayName(gameType, 'en'))
            .setDescription(`${getGameDisplayName(gameType, 'ko')}${suffix[actionType]}`)
            .setValue(gameType)
    );
}

module.exports = buildGameVisibilityOptions;