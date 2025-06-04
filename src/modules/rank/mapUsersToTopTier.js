const getTierScore = require("./getTierScore");

/**
 * 각 유저의 티어 정보 중 가장 높은 항목을 추출하여 정리합니다.
 * 
 * @param {Array<Object>} users - 게임 티어 정보를 포함한 유저 목록
 * @param {string} gameType - 조회할 게임 타입 (예: "leagueOfLegends")
 * @param {Map<string, string>} memberMap - userId와 displayName 매핑 정보
 * @returns {Array<Object>} 유저별 최고 티어 정보 배열
 */
function mapUsersToTopTier(users, gameType, memberMap) {
    return users.map(user => {
        // 해당 유저의 티어 항목 중 가장 높은 티어를 가진 항목 찾기
        const bestEntry = user[gameType].reduce((prev, curr) =>
            getTierScore(curr) > getTierScore(prev) ? curr : prev
        );

        return {
            displayName: memberMap.get(user.userId),
            userId: user.userId,
            nickname: bestEntry.nickname,
            tier: bestEntry.tier.toUpperCase(),
            rank: bestEntry.rank,
            leaguePoints: bestEntry.leaguePoints,
            score: getTierScore(bestEntry),
        };
    });
}

module.exports = mapUsersToTopTier;