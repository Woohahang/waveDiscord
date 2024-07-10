const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const { ButtonBuilder, ButtonStyle } = require('discord.js');

const deleteWaveMessages = require('../modules/deleteWaveMessages');
const UserSettings = require('../../../../services/UserSettings');

function seletMenu() {
    const select = new StringSelectMenuBuilder()
        .setCustomId('starter')
        .setPlaceholder('선택 하세요 !')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('테두리 색상 변경')
                .setDescription('test.')
                .setValue('bulbasaur'),
            new StringSelectMenuOptionBuilder()
                .setLabel('항목2')
                .setDescription('항목2를 선택합니다.')
                .setValue('charmander'),
        );

    return row = new ActionRowBuilder()
        .addComponents(select);
};


function wavebutton() {
    const confirm = new ButtonBuilder()
        .setCustomId('confirm')
        .setLabel('테스트1')
        .setStyle(ButtonStyle.Primary);

    const cancel = new ButtonBuilder()
        .setCustomId('cancel')
        .setLabel('테스트2')
        .setStyle(ButtonStyle.Secondary);

    return row = new ActionRowBuilder()
        .addComponents(cancel, confirm);
};

const message =
    '## 프로필' + '\n' +
    '> * ' + '\n' +
    '> * ';



function createEmbedFields(userData) {
    try {
        const fields = [];





    } catch (error) {
        console.error('test.createEmbedFields() 예외 : ', error);
    };
};


/**
 * 1:1 DM 내 프로필 꾸미기
 * 
*/
module.exports = async (interaction) => {
    try {
        const user = interaction.user;
        const userSettings = new UserSettings(user.id);
        const userData = await userSettings.loadUserData();

        const userChannel = await user.createDM();


        createEmbedFields(userData);



        // Wave 채널의 봇 메세지를 모두 제거합니다. 최신화
        await deleteWaveMessages(userChannel);


        await userChannel.send({ embeds: [embed] });


    } catch (error) {
        console.error('test.js 예외 : ', error);
    };
};