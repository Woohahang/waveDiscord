/**
 * @typedef {Object} VoiceMessage
 * @property {string} channelId
 * @property {string} messageId
 */

async function handleVoiceLeave({ oldState, dependencies }) {

    const guildId = oldState.guild.id;
    const userId = oldState.member.id;

    try {
        /** @type {VoiceMessage | null} */
        const savedMessage = await dependencies.voiceMessageService.get({
            guildId,
            userId,
        });

        if (!savedMessage)
            return;

        const { channelId, messageId } = savedMessage;

        const targetChannel = await oldState.guild.channels.fetch(channelId);
        await targetChannel.messages.delete(messageId);

        await dependencies.voiceMessageService.delete({
            guildId,
            userId,
        });

    } catch (error) {
        // Wave message 가 관리자에 의해 삭제된 경우
        if (error.message === 'Unknown Message') return;

        console.error('[handleVoiceLeave] error:', error);
    }
}

module.exports = handleVoiceLeave;