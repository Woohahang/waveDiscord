const Guild = require('@domain/guild/entities/guild');

/**
 * 길드 기본 정보를 저장하는 유스케이스
 */
class SyncGuildInfoUseCase {
    /**
     * @param {Object} deps
     * @param {import('@domain/guild/repositories/guildRepository')} deps.guildRepository
     * @param {import('@application/guild/ports/guildCacheRepository')} deps.guildCacheRepository
     */
    constructor({ guildRepository, guildCacheRepository }) {
        this.guildRepository = guildRepository;
        this.guildCacheRepository = guildCacheRepository;
    }

    async #loadGuild(guildId) {
        let cachedGuild = await this.guildCacheRepository.get(guildId);

        if (cachedGuild)
            return cachedGuild;

        return await this.guildRepository.findById(guildId);
    }

    /**
     * @param {Object} params
     * @param {string} params.guildId
     * @param {string} params.guildName
     * @param {string} params.ownerId
     * @param {string} params.ownerUsername
     * @returns {Promise<void>}
     */
    async execute({ guildId, guildName, ownerId, ownerUsername }) {

        const guild = await this.#loadGuild(guildId);

        if (!guild)
            guild = Guild.createEmpty(guildId);

        guild.updateInfo({
            guildName,
            ownerId,
            ownerUsername,
        });

        await this.guildRepository.save(guild);
        await this.guildCacheRepository.set(guild);
    }
}

module.exports = SyncGuildInfoUseCase;