class VoiceMessageStore {
    save({ guildId, userId, channelId, messageId }) {
        throw new Error('Not implemented');
    }

    get(guildId, userId) {
        throw new Error('Not implemented');
    }

    delete(guildId, userId) {
        throw new Error('Not implemented');
    }
}

module.exports = VoiceMessageStore;