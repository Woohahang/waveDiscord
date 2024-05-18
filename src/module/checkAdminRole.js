// checkAdminRole.js
const { PermissionsBitField } = require('discord.js');

function checkAdminRole(interaction) {
    try {
        // 멤버 객체 가지고 오기
        const member = interaction.member;

        // 관리자 권한 가지고 오기 없으면 언디파인
        const hasAdminRole = member.permissions.has(PermissionsBitField.Flags.Administrator);

        return hasAdminRole;
    } catch (error) {
        console.error('checkAdminRole.js 에러 : ', error);
    };
};

module.exports = { checkAdminRole };


// 역할 객체 뭐 있는지 싹 다 확인 가능
// console.log(PermissionsBitField.Flags);
