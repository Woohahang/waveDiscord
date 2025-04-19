/**
 * Discord 멤버 객체에서 표시할 이름을 반환합니다.
 * 
 * - 서버 닉네임이 존재하면 해당 닉네임을,
 * - 없으면 Discord 글로벌 이름을 반환합니다.
 * 
 * @param {GuildMember} member - Discord의 GuildMember 객체
 * @returns {string} - 표시할 이름 (닉네임 또는 글로벌 이름)
 */
function getDisplayName(member) {
    return member.nickname || member.user.globalName;
}

module.exports = getDisplayName;