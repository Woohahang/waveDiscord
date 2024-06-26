// gameNicknameSelection.js

const { SlashCommandBuilder } = require('discord.js');
const GuildSettings = require('../../services/GuildSettings');
const gameMenu = require('../../module/games/gameMenu');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("닉네임등록")
        .setDescription("닉네임을 등록할 수 있는 메뉴를 생성합니다 !"),

    async execute(interaction) {
        try {
            // 길드 인스턴스 생성를 생성하고 불러옵니다.
            const guildSettings = new GuildSettings(interaction.member.guild.id);
            const guildData = await guildSettings.loadOrCreate();

            // 서버에 설정 된 게임 메뉴 불러오기
            const row = gameMenu(guildData);

            // 게임 리스트를 불러옵니다.
            await interaction.reply({
                content: '닉네임 등록할 게임을 선택해주세요 !',
                components: [row],
                ephemeral: true
            });

        } catch (error) {
            console.error('gameNicknameSelection.js 에러 : ', error);
        };
    },
};