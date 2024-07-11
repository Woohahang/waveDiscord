// showTeamNumberModal.js

const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { checkVoiceChannel } = require('./module/checkVoiceChannel');

// 모달 생성
function showModal() {
    const modal = new ModalBuilder()
        .setCustomId('teamNumberModal')
        .setTitle('팀 수 입력');

    const teamNumberInput = new TextInputBuilder()
        .setCustomId('teamNumberModal')
        .setLabel('몇 팀으로 구성할까요? (최대 : 15)')
        .setStyle(TextInputStyle.Short)
        .setMinLength(1)
        .setMaxLength(2)
        .setPlaceholder('예시 : 2')
        .setRequired(true)

    // 텍스트 입력 필드를 모달에 추가
    const firstActionRow = new ActionRowBuilder()
        .addComponents(teamNumberInput);

    modal.addComponents(firstActionRow);

    return modal;
};

module.exports = async (interaction) => {
    try {
        // 음성 채널 체크
        const voiceChannel = await checkVoiceChannel(interaction);
        if (!voiceChannel) return;

        // 모달 생성
        const modal = showModal();

        // 모달 제출
        await interaction.showModal(modal);

    } catch (error) {
        console.error('showTeamNumberModal.js 에러', error);
    };
};