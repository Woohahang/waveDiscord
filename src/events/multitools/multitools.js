// multitools.js

const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const { getMemberVoiceChannel } = require('../../module/common/getMemberVoiceChannel');

const multitoolsMenu = new StringSelectMenuBuilder()
    .setCustomId('multitoolsMenu')
    .setPlaceholder('선택 하세요 !')
    .addOptions(
        new StringSelectMenuOptionBuilder()
            .setLabel('팀 섞기')
            .setDescription('현재 음성 채팅방의 인원에서 랜덤으로 팀을 구성합니다.')
            .setValue('teamShuffler'),
        // new StringSelectMenuOptionBuilder()
        //     .setLabel('유저 검색')
        //     .setDescription('현재 음성 채팅방의 인원 닉네임을 정리해서 알려줍니다.')
        //     .setValue('usersSearch'),
    );

let row = new ActionRowBuilder()
    .addComponents(multitoolsMenu);


module.exports = async (interaction) => {
    try {
        // 음성 채널 입장 여부 체크
        const voiceChannel = await getMemberVoiceChannel(interaction);
        if (!voiceChannel) return;

        // row 전송
        await interaction.reply({
            components: [row],
            ephemeral: true
        });

    } catch (error) {
        console.error('multitools.js 에러 : ' + error);
    };
};