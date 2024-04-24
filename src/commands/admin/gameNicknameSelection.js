// src//commands/admin/gameNicknameSelection.js

const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName("닉네임_등록")
        .setDescription("닉네임을 등록할 수 있는 메뉴를 생성합니다."),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        let select = new StringSelectMenuBuilder()
            .setCustomId('gameSelectMenu')
            .setPlaceholder('선택하세요!')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Steam')
                    .setDescription('스팀 친구 코드')
                    .setValue('steam'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('KaKao Battle Grounds')
                    .setDescription('배틀 그라운드 닉네임')
                    .setValue('kaKaoBG'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('League of Legends')
                    .setDescription('리그 오브 레전드 닉네임')
                    .setValue('loL'),
            );

        let row = new ActionRowBuilder()
            .addComponents(select);

        await interaction.channel.send({
            content: '닉네임을 등록할 게임을 선택해주세요!',
            components: [row],
        });

        await interaction.editReply({ content: "성공적으로 생성하였습니다." });
    },
};