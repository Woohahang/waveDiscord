// src/commands/admin/removeSelectedNickname.js

const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const userSchema = require('../../models/userSchema.js');

function generateOptions(userData) {
    const options = [];

    if (userData.steam) {
        options.push({
            value: 'steam',
            label: userData.steam,
            description: 'Steam'
        });
    }

    if (userData.kakao) {
        options.push({
            value: 'kakao',
            label: userData.kakao,
            description: '카카오 배틀 그라운드'
        });
    }

    if (userData.riotGames) {
        options.push({
            value: 'riotGames',
            label: userData.riotGames,
            description: '라이엇 게임즈'
        });
    }

    return options;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('닉네임삭제')
        .setDescription('등록 된 닉네임을 삭제합니다.'),

    async execute(interaction) {

        try {
            // 사용자 정보 조회
            let userData = await userSchema.findOne({ userId: interaction.member.id });

            // DB 에 없는 경우
            if (!userData) { return await interaction.reply({ content: '등록된 정보가 없습니다.', ephemeral: true }); }

            //  등록 된 닉네임의 개수
            const numOptionsWithValue = generateOptions(userData).length;

            // 개수가 0 이면 리턴
            if (numOptionsWithValue === 0) {
                return await interaction.reply({
                    content: '등록 된 닉네임이 없습니다.',
                    ephemeral: true
                });
            }

            const selectedNames = new StringSelectMenuBuilder()
                .setCustomId('removeNickNames')
                .setPlaceholder('선택하세요!')
                .addOptions(generateOptions(userData))
                .setMinValues(1)
                .setMaxValues(numOptionsWithValue);

            const row = new ActionRowBuilder().addComponents(selectedNames);

            await interaction.reply({
                content: '등록 된 닉네임을 삭제합니다! 메뉴를 선택해주세요!',
                components: [row],
                ephemeral: true
            });

        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '닉네임 삭제 중 오류가 발생했습니다.', ephemeral: true });
        }
    },
};