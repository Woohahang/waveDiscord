const { PermissionsBitField } = require('discord.js');

/**
 * 해당 길드에서 봇이 관리자 권한을 가지고 있는지 확인합니다.
 * 
 * @param {Guild} guild Discord Guild 객체
 * @returns {boolean} 관리자 권한 여부
 */
function isBotAdmin(guild) {
    const botMember = guild.members.me;
    return botMember?.permissions.has(PermissionsBitField.Flags.Administrator) ?? false;
}

module.exports = isBotAdmin;