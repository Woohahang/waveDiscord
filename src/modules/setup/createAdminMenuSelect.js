const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

function createAdminMenuSelect() {
    let adminMenuSelect = new StringSelectMenuBuilder()
        .setCustomId('adminMenuId')
        .setPlaceholder('메뉴를 선택하세요')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('Add Game Menu')
                .setDescription('게임 메뉴 추가하기')
                .setValue('showMenu'),

            new StringSelectMenuOptionBuilder()
                .setLabel('Remove Game Menu')
                .setDescription('게임 메뉴 삭제하기')
                .setValue('hideMenu')
        );

    return new ActionRowBuilder().addComponents(adminMenuSelect);
};

module.exports = createAdminMenuSelect;