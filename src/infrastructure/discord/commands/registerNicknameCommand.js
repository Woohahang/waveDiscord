const { SlashCommandBuilder } = require('discord.js');
const buildGuildNicknameSelectMenu = require('../components/buildGuildNicknameSelectMenu');
const logger = require('@utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('닉네임등록')
        .setDescription('게임 닉네임을 등록합니다.'),

    async execute(interaction, dependencies) {

        const guildId = interaction.guild.id;

        try {
            const result = await dependencies.getRegisterableGamesUseCase
                .execute({ guildId });

            const registerableGames = result.data;

            const menu = buildGuildNicknameSelectMenu(registerableGames);

            await interaction.reply({
                content: '등록할 게임을 선택하세요.',
                components: [menu],
                ephemeral: true,
            });

        } catch (error) {
            logger.error('[registerNicknameCommand] /닉네임등록 명령어 사용 중 오류', error);
        }
    },
};