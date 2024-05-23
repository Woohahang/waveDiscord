const { clientId } = require('../../../configTest.json');
const { PermissionsBitField } = require('discord.js');

// 용도 : 길드 채널 생성시 Wave가 관리자 권한을 받았는지 체크하기 위함

function checkGuildAdmin(guild) {
    const wave = guild.members.cache.get(clientId);
    return checkAdmin(wave);
};

function checkInteractionAdmin(interaction) {
    const wave = interaction.guild.members.cache.get(clientId);
    return checkAdmin(wave);
};

function checkVoiceAdmin(state) {
    const wave = state.guild.members.cache.get(clientId);
    return checkAdmin(wave);
};

function checkAdmin(wave) {
    return wave ? wave.permissions.has(PermissionsBitField.Flags.Administrator) : false;
};

module.exports = { checkGuildAdmin, checkInteractionAdmin, checkVoiceAdmin };