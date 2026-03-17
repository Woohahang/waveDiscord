const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, } = require('discord.js');
const getGameDisplayName = require('@shared/utils/getGameDisplayName');

const NICKNAME_LABELS = {
    steam: '✔️ 스팀 프로필 주소를 작성해주세요.',
    default: '✔️ 최대 다섯 개의 닉네임을 등록할 수 있습니다.'
};

function getNicknameLabel(gameType) {
    return NICKNAME_LABELS[gameType] || NICKNAME_LABELS.default;
}

module.exports = function buildNicknameModal(gameType) {
    const modal = new ModalBuilder()
        .setTitle(getGameDisplayName(gameType, 'ko'))
        .setCustomId('submitNickname');

    const input = new TextInputBuilder()
        .setCustomId(gameType)
        .setLabel(getNicknameLabel(gameType))
        .setStyle(TextInputStyle.Short);

    const nicknameInputRow = new ActionRowBuilder().addComponents(input);

    modal.addComponents(nicknameInputRow);

    return modal;
};