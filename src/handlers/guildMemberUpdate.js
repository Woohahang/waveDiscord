// guildMemberUpdate.js

const { checkGuildAdmin } = require('../module/checkAdminPermissionOn');
const nicknameChangeHandler = require('../events/nicknameChange/nicknameChangeHandler');

module.exports = async (oldMember, newMember) => {
    try {
        if (!checkGuildAdmin(oldMember.guild) || !checkGuildAdmin(newMember.guild)) return

        nicknameChangeHandler(oldMember, newMember);


    } catch (error) {
        console.error('guildMemberUpdate.js 예외 : ', error);
    };
};