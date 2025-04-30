const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const guildTierRanking = require('../../events/ranking/guildTierRanking');

function buildEmbed(emoji) {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('소환사의 협곡')
        // .setURL('https://discord.js.org/')
        .setAuthor({ name: '롤대나무숲', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        .setDescription('Some description here')
        .setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .addFields(
            { name: 'Regular field title', value: 'Some value here' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Inline field title', value: 'Some value here', inline: true },
            { name: 'Inline field title', value: 'Some value here', inline: true },
        )
        .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
        .setImage('https://i.imgur.com/AfFp7pu.png')
        .setTimestamp()
        .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('테스트')
        .setDescription('테스트용 개발자 명령어입니다.'),

    async execute(interaction) {
        try {

            // const channel = interaction.channel;

            // const emoji = '<:wave_steam:1340152828475342871>'

            // await channel.send({ embeds: [buildEmbed(emoji)] });

            // await interaction.reply({ content: '임베드 테스트 시작!', ephemeral: true });


        } catch (error) {
            console.log('테스트 명령어 실행 중 오류가 발생했습니다.', error);
        };

    }
};