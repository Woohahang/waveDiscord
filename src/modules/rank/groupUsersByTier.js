/**
 * 유저들을 티어 기준으로 그룹화합니다.
 *
 * 예: {
 *   "MASTER": [user1, user2],
 *   "DIAMOND": [user3],
 *   ...
 * }
 *
 * @param {Array<Object>} users - 유저 객체 배열
 * @returns {Object} 티어별로 그룹화된 유저 객체 (key: 티어)
 */
function groupUsersByTier(users) {
    const grouped = {};

    users.forEach(user => {
        // 해당 티어 키가 없으면 빈 배열 생성
        if (!grouped[user.tier]) grouped[user.tier] = [];

        // 티어 배열에 유저 추가
        grouped[user.tier].push(user);
    })

    return grouped;
}

module.exports = groupUsersByTier;