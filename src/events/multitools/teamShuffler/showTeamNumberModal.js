// showTeamNumberModal.js

const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');


async function showTeamNumberModal(interaction, values) {

    const modal = new ModalBuilder()
        .setCustomId('teamNumberModal')
        .setTitle('팀 수 입력');

    const teamNumberInput = new TextInputBuilder()
        .setCustomId('teamNumberModal')
        .setLabel('몇 팀으로 구성할까요?')
        .setStyle(TextInputStyle.Short)
        .setMinLength(1)
        .setMaxLength(2)
        .setPlaceholder('예시 : 2')
        .setRequired(true)

    // 텍스트 입력 필드를 모달에 추가
    const firstActionRow = new ActionRowBuilder().addComponents(teamNumberInput);

    modal.addComponents(firstActionRow);

    // 모달을 사용자에게 보냄
    await interaction.showModal(modal);

};

module.exports = { showTeamNumberModal };