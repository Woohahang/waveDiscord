// multitools.js

const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

const multitoolsMenu = new StringSelectMenuBuilder()
    .setCustomId('multitoolsMenu')
    .setPlaceholder('선택 하세요 !')
    .addOptions(
        new StringSelectMenuOptionBuilder()
            .setLabel('내 정보 조회')
            .setDescription('Wave 에 등록 되어 있는 모든 정보를 확인합니다.')
            .setValue('viewUserInfo'),
        // new StringSelectMenuOptionBuilder()
        //     .setLabel('내 정보 삭제')
        //     .setDescription('Wave 에 등록 되어 있는 모든 정보를 삭제합니다.')
        //     .setValue('deleteUserInfo'),
        // new StringSelectMenuOptionBuilder()
        //     .setLabel('팀 섞기')
        //     .setDescription('현재 음성 채팅방의 인원에서 랜덤으로 팀을 구성합니다.')
        //     .setValue('teamShuffler'),
    );

let row = new ActionRowBuilder()
    .addComponents(multitoolsMenu);

module.exports = async (interaction) => {
    try {

        // row 전송
        await interaction.reply({
            components: [row],
            ephemeral: true
        });

    } catch (error) {
        console.error('multitools.js 에러 : ', error);
    };
};