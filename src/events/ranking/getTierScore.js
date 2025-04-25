const { TIER_ORDER, RANK_ORDER } = require('./loltier');

function getTierScore(entry) {
    const tier = entry.tier?.toUpperCase();
    const rank = entry.rank?.toUpperCase();

    const tierIndex = TIER_ORDER.indexOf(tier);
    const rankIndex = RANK_ORDER.indexOf(rank);

    if (tierIndex === -1 || rankIndex === -1) return -1;

    return tierIndex * 10000 + (3 - rankIndex) * 100 + (entry.leaguePoints ?? 0);
}

module.exports = getTierScore;