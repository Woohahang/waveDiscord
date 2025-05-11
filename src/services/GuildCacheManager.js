class GuildCacheManager {

    static GUILD_MAPS = {};
    static MAX_CACHE_SIZE = 100;

    static get(guildId) {
        const cachedData = this.GUILD_MAPS[guildId];
        if (cachedData) {
            cachedData.timestamp = Date.now();
            return cachedData.data;
        }
        return null;
    }

    static set(guildId, guildData) {
        this.GUILD_MAPS[guildId] = {
            data: guildData,
            timestamp: Date.now()
        };
        this.checkCacheSize();
    }

    static checkCacheSize() {
        const keys = Object.keys(this.GUILD_MAPS);
        if (keys.length > this.MAX_CACHE_SIZE) {
            keys.sort((a, b) => this.GUILD_MAPS[a].timestamp - this.GUILD_MAPS[b].timestamp);
            const oldestKey = keys[0];
            delete this.GUILD_MAPS[oldestKey];
        }
    }

}

module.exports = GuildCacheManager;