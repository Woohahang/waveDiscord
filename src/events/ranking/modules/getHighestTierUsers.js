const getTierScore = require('./getTierScore');

/**
 * 유저 데이터에서 가장 높은 티어를 가진 항목을 추출합니다.
 */
function getHighestTierUsers(guildUserDatas, memberMap) {
    return guildUserDatas.map(user => {
        const validEntries = user.leagueOfLegends.filter(e => e.tier);
        if (validEntries.length === 0) return null;

        const bestEntry = validEntries.reduce((prev, curr) =>
            getTierScore(curr) > getTierScore(prev) ? curr : prev
        );

        return {
            displayName: memberMap.get(user.userId),
            userId: user.userId,
            summonerName: bestEntry.summonerName,
            tier: bestEntry.tier.toUpperCase(),
            rank: bestEntry.rank,
            leaguePoints: bestEntry.leaguePoints,
            score: getTierScore(bestEntry),
        };
    }).filter(Boolean);
}

module.exports = getHighestTierUsers;