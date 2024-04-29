// src//commands/admin/gameNicknameSelection.js

const { SlashCommandBuilder } = require('discord.js');

const { gameMenuLoader } = require('../../module/gameMenuLoader.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("닉네임등록")
        .setDescription("닉네임을 등록할 수 있는 메뉴를 생성합니다 !"),

    async execute(interaction) {
        try {
            if (interaction.guild.ownerId !== interaction.user.id) {
                return await interaction.reply({
                    content: "서버 소유자만 생성할 수 있습니다.",
                    ephemeral: true // 해당 메시지를 사용자에게만 표시합니다.
                });
            }

            await interaction.deferReply({ ephemeral: true });

            await interaction.channel.send({
                content: '**닉네임 등록할 게임을 선택해주세요 !**',
                components: [await gameMenuLoader()],
            });

            await interaction.editReply({ content: "성공적으로 생성하였습니다." });
        } catch (error) {
            console.error("메뉴 생성 중 오류 발생:", error.message);
        }
    },
};