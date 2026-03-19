const GuildCacheRepository = require('@application/guild/ports/guildCacheRepository');

class MemoryGuildCacheRepository extends GuildCacheRepository {
    constructor() {
        super();
        this.cache = new Map();
    }

    async get(guildId) {
        return this.cache.get(guildId) ?? null;
    }

    async set(guild) {
        this.cache.set(guild.guildId, guild);
    }

    async delete(guildId) {
        this.cache.delete(guildId);
    }

    async clear() {
        this.cache.clear();
    }
}

module.exports = MemoryGuildCacheRepository;