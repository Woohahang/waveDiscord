const GUILD_RESULT_CODES = require('../constants/guildResultCodes');
const Result = require('@shared/result/result');

class SendMainChannelUIUseCase {

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

        const guildEntry = await this.#loadGuild(guildId);

        if (!guildEntry)
            throw new Error('[SendMainChannelUIUseCase] 길드 정보를 찾을 수 없습니다.');

        if (!guildEntry.mainChannelId)
            return Result.fail({
                code: GUILD_RESULT_CODES.MAIN_CHANNEL_NOT_SET
            });

        return Result.ok({
            data: {
                channelId: guildEntry.mainChannelId,
                enabledGames: guildEntry.getEnabledGames(),
            }
        });

    }

}

module.exports = SendMainChannelUIUseCase;