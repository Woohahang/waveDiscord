const GUILD_RESULT_CODES = require('../constants/guildResultCodes');

class SendMainChannelUIUseCase {

    constructor({ guildRepository, guildCacheRepository }) {
        this.guildRepository = guildRepository;
        this.guildCacheRepository = guildCacheRepository;
    }

    async execute({ guildId }) {
        let guildEntity = await this.guildCacheRepository.get(guildId);

        if (!guildEntity)
            guildEntity = await this.guildRepository.findById(guildId);

        if (!guildEntity)
            throw new Error('[SendMainChannelUIUseCase] 길드 정보를 찾을 수 없습니다.');

        if (!guildEntity.mainChannelId)
            return {
                ok: false,
                code: GUILD_RESULT_CODES.MAIN_CHANNEL_NOT_SET,
            };

        return {
            ok: true,
            data: {
                channelId: guildEntity.mainChannelId,
                enabledGames: guildEntity.getEnabledGames(),
            }
        }
    }

}

module.exports = SendMainChannelUIUseCase;