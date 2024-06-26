const { StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');

// 옵션 배열을 받아서 디스코드 셀렉트 메뉴를 생성합니다.
function createMenu(options) {
    const optionsLength = options.length;

    const selectedNames = new StringSelectMenuBuilder()
        .setCustomId('removeNickNames')
        .setPlaceholder('선택하세요!')
        .addOptions(options)
        .setMinValues(1)
        .setMaxValues(optionsLength);

    const row = new ActionRowBuilder()
        .addComponents(selectedNames);

    return row;
};

module.exports = createMenu;