const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

function multitoolsMenu() {

    const multitoolsMenu = new StringSelectMenuBuilder()
        .setCustomId('multitoolsMenu')
        .setPlaceholder('선택 하세요 !')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('팀 섞기')
                .setDescription('현재 음성 채팅방의 인원에서 랜덤으로 팀을 구성합니다.')
                .setValue('teamShuffler'),
            new StringSelectMenuOptionBuilder()
                .setLabel('유저 검색')
                .setDescription('현재 음성 채팅방의 인원 닉네임을 정리해서 알려줍니다.')
                .setValue('usersSearch'),
        );

    return row = new ActionRowBuilder()
        .addComponents(multitoolsMenu);

};

async function multitools(interaction) {

    const member = interaction.member;

    // 음성 채널 입장 여부
    const voiceChannel = member.voice.channel;
    if (!voiceChannel) { return await interaction.reply({ content: '음성 채널 입장 후 사용할 수 있습니다.', ephemeral: true }); };

    await interaction.reply({
        components: [multitoolsMenu()],
        ephemeral: true
    });

};

module.exports = { multitools };