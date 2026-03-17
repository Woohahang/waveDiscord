class SendMainChannelUIUseCase {

    constructor({ guildRepository }) {
        this.guildRepository = guildRepository;
    }

    async execute({ guildId }) {
        const guildEntity = await this.guildRepository.findById(guildId);

        if (!guildEntity)
            throw new Error('[SendMainChannelUIUseCase] 길드 정보를 찾을 수 없습니다.');

        if (!guildEntity.mainChannelId)
            return {
                ok: false,
                code: "MAIN_CHANNEL_NOT_SET"
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