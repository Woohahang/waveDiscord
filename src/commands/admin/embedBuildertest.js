// src/commands/admin/embedBuildertest.js

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const userSchema = require('../../models/userSchema.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('임베드')
        .setDescription('임베드 테스트'),

    async execute(interaction) {
        const user = interaction.user;

        const emb = new EmbedBuilder()
            .setColor(0x0099FF)
            .setAuthor({ name: user.globalName, iconURL: user.displayAvatarURL(), url: user.avatarURL() })
            .addFields(
                { name: 'Steam 프로필', value: '[스팀 친구 추가하기](https://steamcommunity.com/profiles/76561198311685982/)', inline: true },
                { name: '카카오 배틀 그라운드', value: '[testName](https://dak.gg/pubg)', inline: true },
                { name: '　', value: '　' },
                { name: '리그 오브 레전드', value: '[끼매누#KR1](https://www.op.gg/summoners/kr/%EB%81%BC%EB%A7%A4%EB%88%84-KR1)', inline: true },
                { name: '발로란트', value: '[testName](https://dak.gg/valorant?hl=ko)', inline: true },
                { name: '\u200B', value: '\u200B' }
            )
            .setTimestamp(new Date('2024-02-24T12:00:00'))
            .setFooter({ text: '━━━━━━━━━━━━━━━ update', iconURL: 'https://cdn-icons-png.flaticon.com/512/5052/5052710.png' });

        await interaction.reply({ embeds: [emb] });
    }

};
