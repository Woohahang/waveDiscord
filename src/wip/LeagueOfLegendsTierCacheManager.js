const NodeCache = require('node-cache');
const leagueTierCache = new NodeCache({ stdTTL: 60 * 60 }); // 1시간 TTL

class LeagueOfLegendsTierCacheManager {
    static get(userId) {
        return leagueTierCache.get(userId);
    }

    static set(userId, tierData) {
        leagueTierCache.set(userId, tierData);
    }

    static del(userId) {
        leagueTierCache.del(userId);
    }

    static flush() {
        leagueTierCache.flushAll();
    }
}

module.exports = LeagueOfLegendsTierCacheManager;