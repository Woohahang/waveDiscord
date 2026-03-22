const Result = require('@shared/result/result');

class RemoveVoiceMessageUseCase {

    constructor({ voiceMessageStore }) {
        this.voiceMessageStore = voiceMessageStore;
    }

    async execute({ guildId, userId }) {
        const savedMessage = this.voiceMessageStore.get({ guildId, userId });

        if (!savedMessage)
            return Result.fail({ code: "VOICE_MESSAGE_NOT_FOUND" });

        this.voiceMessageStore.delete({ guildId, userId, });

        return Result.ok({
            data: savedMessage,
        });

    }
}

module.exports = RemoveVoiceMessageUseCase;