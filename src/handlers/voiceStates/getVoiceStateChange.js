function getVoiceStateChange(oldState, newState) {
    if (!oldState.channel && newState.channel)
        return 'voiceJoin';

    if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id)
        return 'voiceMove';

    if (oldState.channel && !newState.channel)
        return 'voiceExit';
};

module.exports = getVoiceStateChange;