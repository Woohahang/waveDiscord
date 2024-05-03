// src//commands/admin/gameNicknameSelection.js

const { SlashCommandBuilder } = require('discord.js');
const { gameMenuLoader } = require('../../module/gameMenuLoader.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("닉네임등록")
        .setDescription("닉네임을 등록할 수 있는 메뉴를 생성합니다 !"),

    async execute(interaction) {
        try {

            // 게임 리스트를 불러옵니다.
            await interaction.reply({
                content: '닉네임 등록할 게임을 선택해주세요 !',
                components: [await gameMenuLoader()],
                ephemeral: true
            });

        } catch (error) {
            console.error("메뉴 생성 중 오류 발생:", error.message);
        }
    },
};