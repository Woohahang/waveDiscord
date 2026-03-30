const Result = require("@shared/result/result");

class GetRegisterableGamesUseCase {
    constructor({ guildRepository, guildCacheRepository }) {
        this.guildRepository = guildRepository;
        this.guildCacheRepository = guildCacheRepository;
    }

    async #loadGuild(guildId) {
        const cachedGuild = await this.guildCacheRepository.get(guildId);

        if (cachedGuild)
            return cachedGuild;

        return this.guildRepository.findById(guildId);
    }

    async execute({ guildId }) {
        const guildEntry = await this.#loadGuild(guildId);

        if (!guildEntry)
            throw new Error('[GetRegisterableGamesUseCase] 길드 정보를 찾을 수 없습니다.');

        const registerableGames = guildEntry.getEnabledGames();

        return Result.ok({
            data: registerableGames
        });

    }
}

module.exports = GetRegisterableGamesUseCase;