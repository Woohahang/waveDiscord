const { TIER_ORDER, RANK_ORDER } = require('../../../constants/lolTier');

/**
 * 주어진 롤 티어 정보를 점수화하여 반환합니다.
 * 높은 티어일수록 높은 점수를 갖습니다.
 * 
 * @param {Object} entry - 티어 정보 객체
 * @param {string} entry.tier - 티어 (예: "GOLD", "PLATINUM" 등)
 * @param {string} entry.rank - 랭크 (예: "I", "II", "III", "IV")
 * @param {number} [entry.leaguePoints] - 리그 포인트 (LP)
 * @returns {number} 계산된 티어 점수 (비교용). 티어/랭크가 없으면 -1 반환
 */
function getTierScore(entry) {
    const tier = entry.tier?.toUpperCase();
    const rank = entry.rank?.toUpperCase();

    const tierIndex = TIER_ORDER.indexOf(tier);
    const rankIndex = RANK_ORDER.indexOf(rank);

    if (tierIndex === -1 || rankIndex === -1) return -1;

    // 티어별 가중치(10000점 단위) + 랭크별 가중치(100점 단위) + LP를 합산
    return tierIndex * 10000 + (3 - rankIndex) * 100 + (entry.leaguePoints ?? 0);
}

module.exports = getTierScore;