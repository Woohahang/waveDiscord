const VoiceMessageStore = require('@application/voice/ports/voiceMessageStore');

class InMemoryVoiceMessageStore extends VoiceMessageStore {
    constructor() {
        super();
        this.store = new Map();
    }

    #createKey(guildId, userId) {
        return `${guildId}:${userId}`;
    }

    save({ guildId, userId, channelId, messageId }) {
        this.store.set(this.#createKey(guildId, userId), {
            channelId,
            messageId,
        });
    }

    get({ guildId, userId }) {
        return this.store.get(this.#createKey(guildId, userId)) ?? null;
    }

    delete({ guildId, userId }) {
        this.store.delete(this.#createKey(guildId, userId));
    }
}

module.exports = InMemoryVoiceMessageStore;