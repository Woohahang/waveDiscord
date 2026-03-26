class VoiceMessageService {
    constructor({ voiceMessageStore }) {
        this.voiceMessageStore = voiceMessageStore;
    }

    async save({ guildId, userId, channelId, messageId }) {
        this.voiceMessageStore.save({
            guildId,
            userId,
            channelId,
            messageId,
        });
    }

    async get({ guildId, userId }) {
        return this.voiceMessageStore.get({
            guildId,
            userId,
        });
    }

    async delete({ guildId, userId }) {
        this.voiceMessageStore.delete({
            guildId,
            userId,
        });
    }
}

module.exports = VoiceMessageService;