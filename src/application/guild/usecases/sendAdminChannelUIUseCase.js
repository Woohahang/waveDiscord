class SendAdminChannelUIUseCase {

    constructor({ guildRepository }) {
        this.guildRepository = guildRepository;
    }

    async execute({ guildId }) {
        const guildEntity = await this.guildRepository.findById(guildId);

        if (!guildEntity)
            throw new Error('[SendAdminChannelUIUseCase] 길드 정보를 찾을 수 없습니다.');

        if (!guildEntity.adminChannelId)
            return {
                ok: false,
                code: "ADMIN_CHANNEL_NOT_SET"
            };

        return {
            ok: true,
            data: {
                channelId: guildEntity.adminChannelId,
            }
        }
    }

}

module.exports = SendAdminChannelUIUseCase;