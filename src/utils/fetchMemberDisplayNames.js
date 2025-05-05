const getDisplayName = require('@shared/utils/getDisplayName');
const logger = require('@utils/logger');

/**
 * 서버 멤버들의 ID와 displayName을 매핑한 Map을 반환합니다.
 * 
 * @param {GuildMemberManager} members - Discord 서버의 멤버 매니저 (`guild.members`)
 * @returns {Promise<Map<string, string>>} - 유저 ID와 닉네임을 매핑한 Map 객체
 */
async function fetchMemberDisplayNames(members) {
    const memberMap = new Map();

    // 모든 멤버 정보를 가져옵니다 (캐시되지 않은 멤버 포함)
    const fetchedMembers = await members.fetch();

    // 각 멤버의 ID와 displayName을 매핑
    fetchedMembers.forEach(member => {
        memberMap.set(member.id, getDisplayName(member));
    });

    return memberMap;
}

module.exports = fetchMemberDisplayNames;