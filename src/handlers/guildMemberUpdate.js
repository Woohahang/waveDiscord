// guildMemberUpdate.js

const { checkGuildAdmin } = require('../module/checkAdminPermissionOn');
// const assignRoleByNick = require('../events/roleManagement/roleHandlers/assignRoleByNick');

// 닉네임 변화를 확인하여 알맞는 파일명 반환
function checkNicknameChange(oldMember, newMember) {
    try {
        if (oldMember.nickname !== newMember.nickname) {
            return 'assignRoleByNick';
        };

    } catch (error) {
        throw error;
    };
};

module.exports = async (oldMember, newMember) => {
    try {
        if (!checkGuildAdmin(oldMember.guild) || !checkGuildAdmin(newMember.guild)) return

        const selectFile = checkNicknameChange(oldMember, newMember);

        switch (selectFile) {
            case 'assignRoleByNick':
                // assignRoleByNick(newMember);
                break;

            default:
                console.error('존재하지 않는 파일명 입니다.');
        };

    } catch (error) {
        console.error('guildMemberUpdate.js 예외 : ', error);
    };
};