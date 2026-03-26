const STATE_KEYS = require("@constants/stateKeys");
const Result = require("@shared/result/result");

class GetHideableGamesUseCase {
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

    async execute({ guildId }) {
        // 길드 조회
        const guildEntry = await this.#loadGuild(guildId);

        if (!guildEntry)
            throw new Error('[GetHideableGamesUseCase] 길드 정보를 찾을 수 없습니다.');

        const enabledGames = guildEntry.getEnabledGames();

        if (enabledGames.length <= 0)
            return Result.ok({ code: STATE_KEYS.MENU.NO_MENU_TO_HIDE });

        return Result.ok({ data: enabledGames });
    }
}

module.exports = GetHideableGamesUseCase;