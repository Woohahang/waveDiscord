class LeagueOfLegendsTierCacheManager {
    static cache = {};

    static get(userId) {
        const cached = this.cache[userId];
        if (cached) {
            return cached.data;
        }
        return null;
    }

}

module.exports = LeagueOfLegendsTierCacheManager;