// adminMenuLoader.js

const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

function adminMenuLoader() {
    let adminMenuSelect = new StringSelectMenuBuilder()
        .setCustomId('adminMenuId')
        .setPlaceholder('메뉴를 선택하세요')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('ShowMenu')
                .setDescription('게임 메뉴 추가하기')
                .setValue('showMenu'),

            new StringSelectMenuOptionBuilder()
                .setLabel('HideMenu')
                .setDescription('게임 메뉴 삭제하기')
                .setValue('hideMenu'),

            // new StringSelectMenuOptionBuilder()
            //     .setLabel('AliasTemplates')
            //     .setDescription('서버 별명 양식 설정하기')
            //     .setValue('aliasTemplates'),

        );

    let row = new ActionRowBuilder()
        .addComponents(adminMenuSelect);

    return row;
};

module.exports = adminMenuLoader;