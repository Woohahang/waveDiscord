const Guild = require('@domain/guild/entities/guild');

/**
 * 길드 기본 정보를 저장하는 유스케이스
 */
class SyncGuildInfoUseCase {
    /**
     * @param {Object} deps
     * @param {import('@domain/guild/repositories/GuildRepository')} deps.guildRepository
     */
    constructor({ guildRepository }) {
        this.guildRepository = guildRepository;
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
        let guild = await this.guildRepository.findById(guildId);

        if (!guild)
            guild = Guild.createEmpty(guildId);

        guild.updateInfo({
            guildName,
            ownerId,
            ownerUsername,
        });

        await this.guildRepository.save(guild);
    }
}

module.exports = SyncGuildInfoUseCase;