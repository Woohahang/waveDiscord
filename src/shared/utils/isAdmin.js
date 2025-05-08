const { PermissionsBitField } = require('discord.js');
const getDisplayName = require('./getDisplayName');


/**
 * 주어진 멤버가 관리자 권한을 가지고 있는지 확인합니다.
 * 
 * @param {GuildMember} member - Discord 서버 멤버 객체
 * @returns {boolean} 관리자 권한 여부
 */
function isAdmin(member) {
    try {
        return member.permissions.has(PermissionsBitField.Flags.Administrator);
    } catch (error) {
        console.error('[isAdmin] 관리자 권한 확인 중 예외 발생:', {
            memberId: member.id,
            username: member.user.username,
            displayName: getDisplayName(member),
            stack: error.stack
        });

        return false;
    }
}

module.exports = isAdmin;