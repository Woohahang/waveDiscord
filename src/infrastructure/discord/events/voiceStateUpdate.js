const { Events } = require('discord.js');

module.exports = function voiceStateUpdate(client, dependencies) {

    client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
        try {
            // 채널 입장
            if (!oldState.channelId && newState.channelId) {
                console.log('입장');
            }

            // 채널 이동
            if (oldState.channelId && newState.channelId && oldState.channelId !== newState.channelId) {
                console.log('이동');
            }

            // 채널 퇴장
            if (oldState.channelId && !newState.channelId) {
                console.log('퇴장');
            }

        } catch (error) {

        }
    })

}