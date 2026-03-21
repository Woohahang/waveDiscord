const { Events } = require('discord.js');

function buildUserInfoEmbedField() {

}

module.exports = function voiceStateUpdate(client, dependencies) {

    client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
        try {
            // 채널 입장
            if (!oldState.channelId && newState.channelId) {
                console.log('입장');
                const member = newState.member;
                const guild = newState.guild;

                const result = await dependencies.sendVoiceProfileMessageUseCase
                    .execute({
                        userId: member.id,
                        guildId: guild.id
                    });

                if (!result.data)
                    return;

                console.log('[voiceStateUpdate] result.data:', result.data);
                if (!result.ok) return;


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
            console.error('[voiceStateUpdate] 에러', error);
        }
    })

}