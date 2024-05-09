const { clientId } = require('../../../config.json');
const { PermissionsBitField } = require('discord.js');

// 용도 : 길드 채널 생성시 Wave가 관리자 권한을 받았는지 체크하기 위함
// function checkAdminPermissionOnGuild(guild) {
//     const wave = guild.members.cache.get(clientId); // wave 객체

//     return wave.permissions.has(PermissionsBitField.Flags.Administrator); // 객체에 관리자 권한이 있는지 체크
// };

// function checkAdminPermissionOnInteraction(interaction) {
//     let wave = interaction.guild.members.cache.get(clientId);

//     return wave.permissions.has(PermissionsBitField.Flags.Administrator);
// };


// // 내 봇을 관리자 권한 없이 초대하고 음성대화방 들어가면 에러날듯 이걸로 방지해야하는데 코드 간소화 리팩토링 필요
// function checkAdminPermissionOnVoice(newState) {
//     const wave = newState.guild.members.cache.get(clientId);

//     return wave.permissions.has(PermissionsBitField.Flags.Administrator);
// };



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



// module.exports = { checkAdminPermissionOnGuild, checkAdminPermissionOnInteraction, checkAdminPermissionOnVoice };