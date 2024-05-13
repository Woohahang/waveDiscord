// teamShufflerHandler.js

const { EmbedBuilder } = require('discord.js');

async function teamShufflerHandler(interaction) {

    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
        await interaction.followUp({ content: '음성 채널에 있어야 이 기능을 사용할 수 있습니다.', ephemeral: true });
        return;
    };

    console.log(voiceChannel.members);


    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('팀 나누기')
        .addFields(
            { name: '1팀_______', value: interaction.values[0] + interaction.values[1] },
            { name: ' ', value: '현우 1' },
            { name: '2팀', value: '현우 2' },
        )
        .setTimestamp()
        .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    await voiceChannel.send({ embeds: [embed] });

};

module.exports = { teamShufflerHandler };