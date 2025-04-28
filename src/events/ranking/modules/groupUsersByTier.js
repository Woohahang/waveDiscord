/**
 * 티어별로 유저를 그룹핑합니다.
 */
function groupUsersByTier(users) {
    const grouped = {};
    for (const user of users) {
        if (!grouped[user.tier]) {
            grouped[user.tier] = [];
        }
        grouped[user.tier].push(user);
    }
    return grouped;
}

module.exports = groupUsersByTier;