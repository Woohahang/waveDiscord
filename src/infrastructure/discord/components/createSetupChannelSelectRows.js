const { ActionRowBuilder, ChannelSelectMenuBuilder, ChannelType, } = require('discord.js');
const CUSTOM_IDS = require('@shared/constants/interactionCustomIds');

module.exports = function createSetupChannelSelectRows() {
    const mainChannelSelect = new ChannelSelectMenuBuilder()
        .setCustomId(CUSTOM_IDS.GUILD.SETUP.SELECT_MAIN_CHANNEL)
        .setPlaceholder('메인 채널을 선택하세요.')
        .setMinValues(1)
        .setMaxValues(1)
        .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement);

    const adminChannelSelect = new ChannelSelectMenuBuilder()
        .setCustomId(CUSTOM_IDS.GUILD.SETUP.SELECT_ADMIN_CHANNEL)
        .setPlaceholder('관리자 채널을 선택하세요.')
        .setMinValues(1)
        .setMaxValues(1)
        .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement);

    return [
        new ActionRowBuilder().addComponents(mainChannelSelect),
        new ActionRowBuilder().addComponents(adminChannelSelect),
    ];
};