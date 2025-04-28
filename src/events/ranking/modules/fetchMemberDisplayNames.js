const getDisplayName = require('@shared/utils/getDisplayName');

/**
 * 서버 멤버의 displayName을 가져옵니다.
 */
async function fetchMemberDisplayNames(guild) {
    try {
        const members = await guild.members.fetch();
        const memberMap = new Map();
        members.forEach(member => {
            memberMap.set(member.id, getDisplayName(member));
        });
        return memberMap;
    } catch (error) {
        console.error('[fetchMemberDisplayNames] 서버 멤버들을 가져오는 중 오류 발생:', error);
    }
}

module.exports = fetchMemberDisplayNames;