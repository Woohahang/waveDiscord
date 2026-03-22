const Result = require('@shared/result/result');

class SaveVoiceMessageUseCase {

    constructor({ voiceMessageStore }) {
        this.voiceMessageStore = voiceMessageStore;
    }

    async execute({ guildId, userId, channelId, messageId }) {
        this.voiceMessageStore.save({
            guildId,
            userId,
            channelId,
            messageId,
        });

        return Result.ok();
    }
}

module.exports = SaveVoiceMessageUseCase;