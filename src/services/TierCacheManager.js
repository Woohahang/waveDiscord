
class TierCacheManager {
    static cache = {};
    static MAX_CACHE_SIZE = 100;

    static get(guildId, game) {
        const entry = this.cache[guildId]?.[game];
        entry.timestamp = Date.now(); // LRU용 갱신
        return entry.data;
    }

}

module.exports = TierCacheManager;