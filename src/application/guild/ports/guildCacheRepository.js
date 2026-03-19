class GuildCacheRepository {
    async get(guildId) {
        throw new Error('GuildCacheRepository.get must be implemented');
    }

    async set(guild) {
        throw new Error('GuildCacheRepository.set must be implemented');
    }

    async delete(guildId) {
        throw new Error('GuildCacheRepository.delete must be implemented');
    }

    async clear() {
        throw new Error('GuildCacheRepository.clear must be implemented');
    }
}

module.exports = GuildCacheRepository;