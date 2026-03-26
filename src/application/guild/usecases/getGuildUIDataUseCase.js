const GUILD_RESULT_CODES = require('../constants/guildResultCodes');
const Result = require('@shared/result/result');

class GetGuildUIDataUseCase {
    constructor({ guildRepository, guildCacheRepository }) {
        this.guildRepository = guildRepository;
        this.guildCacheRepository = guildCacheRepository;
    }

    async #loadGuild(guildId) {
        const cachedGuild = await this.guildCacheRepository.get(guildId);

        if (cachedGuild)
            return cachedGuild;

        return await this.guildRepository.findById(guildId);
    }

    async execute({ guildId }) {
        const guildEntry = await this.#loadGuild(guildId);

        if (!guildEntry)
            throw new Error('[GetGuildUIDataUseCase] 길드 정보를 찾을 수 없습니다.');

        if (!guildEntry.mainChannelId || !guildEntry.adminChannelId)
            return Result.fail({ code: '[GetGuildUIDataUseCase] 구현 예정' });

        return Result.ok({
            data: {
                adminChannelId: guildEntry.adminChannelId ?? null,
                mainChannelId: guildEntry.mainChannelId ?? null,
                enabledGames: guildEntry.getEnabledGames(),
            }
        });
    }
}

module.exports = GetGuildUIDataUseCase;