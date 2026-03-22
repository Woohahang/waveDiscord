async function handleVoiceLeave({ oldState, dependencies }) {

    const guildId = oldState.guild.id;
    const userId = oldState.member.id;

    try {
        const result = await dependencies.removeVoiceMessageUseCase
            .execute({
                guildId,
                userId
            });

        if (!result.ok) return;

        const { channelId, messageId } = result.data;

        const targetChannel = await oldState.guild.channels.fetch(channelId);
        await targetChannel.messages.delete(messageId);

    } catch (error) {
        if (error.message === 'Unknown Message') return;

        console.error('[handleVoiceLeave] error:', error);
    }
}

module.exports = handleVoiceLeave;