// src//commands/admin/gameNicknameSelection.js

const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } = require('discord.js');

const { gameMenuLoader } = require('../../module/gameMenuLoader.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName("닉네임등록")
        .setDescription("닉네임을 등록할 수 있는 메뉴를 생성합니다 !"),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        await interaction.channel.send({
            content: '닉네임을 등록할 게임을 선택해주세요!',
            components: [gameMenuLoader()],
        });

        await interaction.editReply({ content: "성공적으로 생성하였습니다." });
    },
};