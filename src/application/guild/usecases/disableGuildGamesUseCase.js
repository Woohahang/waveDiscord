const STATE_KEYS = require("@constants/stateKeys");
const Result = require("@shared/result/result");

class DisableGuildGamesUseCase {

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
            throw new Error('[DisableGuildGamesUseCase] 길드 정보를 찾을 수 없습니다.');

        gameTypes.forEach(gameType =>
            guild.disableGame(gameType)
        );

        await this.guildRepository.save(guild);
        await this.guildCacheRepository.set(guild);

        return Result.ok({
            code: STATE_KEYS.USER.DELETE_SUCCESS,
        });
    }

}

module.exports = DisableGuildGamesUseCase;