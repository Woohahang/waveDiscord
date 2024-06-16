const { checkGuildAdmin } = require('../module/checkAdminPermissionOn');
const nicknameChangeHandler = require('../events/nicknameChange/nicknameChangeHandler');

module.exports = async (oldMember, newMember) => {
    try {
        // Wave 관리자 권한 확인
        if (!checkGuildAdmin(oldMember.guild) || !checkGuildAdmin(newMember.guild)) return

        // 닉네임 변경 여부 확인
        if (oldMember.nickname !== newMember.nickname) {
            nicknameChangeHandler(oldMember, newMember);
        };


    } catch (error) {
        console.error('guildMemberUpdate.js 예외 : ', error);
    };
};