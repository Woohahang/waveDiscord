const Result = require("@shared/result/result");

class EnableGuildGamesUseCase {

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

    async execute({ guildId, gameTypes }) {
        const guild = await this.#loadGuild(guildId);

        if (!guild)
            throw new Error('[GetHideableGamesUseCase] 길드 정보를 찾을 수 없습니다.');

        gameTypes.forEach(gameType =>
            guild.enableGame(gameType)
        );

        await this.guildRepository.save(guild);
        await this.guildCacheRepository.set(guild);

        return Result.ok();
    }

}

module.exports = EnableGuildGamesUseCase;