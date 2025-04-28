const getDisplayName = require('../../../shared/utils/getDisplayName');

/**
 * 서버 멤버의 displayName을 가져옵니다.
 */
async function fetchMemberDisplayNames(guild) {
    const members = await guild.members.fetch();
    const memberMap = new Map();
    members.forEach(member => {
        memberMap.set(member.id, getDisplayName(member));
    });
    return memberMap;
}

module.exports = fetchMemberDisplayNames;