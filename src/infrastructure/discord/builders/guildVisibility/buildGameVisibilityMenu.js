const { StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const buildGameVisibilityOptions = require('./buildGameVisibilityOptions');
const CUSTOM_IDS = require('@shared/constants/interactionCustomIds');

const CUSTOM_ID_MAP = {
    showMenu: CUSTOM_IDS.GUILD.GAME_VISIBILITY.SHOW_SELECT,
    hideMenu: CUSTOM_IDS.GUILD.GAME_VISIBILITY.HIDE_SELECT,
};

const PLACEHOLDER_MAP = {
    showMenu: '보이게 할 게임을 선택해주세요.',
    hideMenu: '숨길 게임을 선택해주세요.',
};

function buildGameVisibilityMenu({ actionType, gameTypes }) {
    const customId = CUSTOM_ID_MAP[actionType];
    const placeholder = PLACEHOLDER_MAP[actionType];
    const options = buildGameVisibilityOptions(actionType, gameTypes);

    const menu = new StringSelectMenuBuilder()
        .setCustomId(customId)
        .setPlaceholder(placeholder)
        .setMinValues(1)
        .setMaxValues(options.length)
        .addOptions(options);

    return new ActionRowBuilder().addComponents(menu);
}

module.exports = buildGameVisibilityMenu;