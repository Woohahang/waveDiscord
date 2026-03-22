const { Events } = require('discord.js');
const handleVoiceJoin = require('../handlers/handleVoiceJoin');
const handleVoiceLeave = require('../handlers/handleVoiceLeave');

/**
 * 음성 채널 이동 여부를 확인합니다.
 *
 * 음소거, 방송 시작/종료, 카메라 상태 변경처럼
 * 채널 자체가 바뀌지 않은 이벤트는 무시합니다.
 *
 * @param {import('discord.js').VoiceState} oldState
 * @param {import('discord.js').VoiceState} newState
 * @returns {boolean}
 */
function isVoiceChannelChanged(oldState, newState) {
    return oldState.channelId !== newState.channelId;
}

module.exports = function voiceStateUpdate(client, dependencies) {

    /**
     * 동일 유저에 대한 음성 상태 이벤트를 순차 처리하기 위한 맵입니다.
     *
     * key: userId
     * value: Promise
     *
     * @type {Map<string, Promise<void>>}
    */
    const userProcessingMap = new Map();

    client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
        if (!isVoiceChannelChanged(oldState, newState)) return;

        const userId = newState.member?.id || oldState.member?.id;
        const prevTask = userProcessingMap.get(userId) || Promise.resolve();

        const nextTask = prevTask
            .catch((error) => {
                console.error('[voiceStateUpdate] previousTask error:', error);
            })
            .then(async () => {
                // 음성 채널 입장
                if (oldState.channelId)
                    await handleVoiceLeave({ oldState, dependencies });

                // 음성 채널 퇴장
                if (newState.channelId)
                    await handleVoiceJoin({ newState, dependencies });
            })
            .catch((error) => {
                console.error('[voiceStateUpdate] currentTask error:', error);
            })
            .finally(() => {
                if (userProcessingMap.get(userId) === nextTask)
                    userProcessingMap.delete(userId);
            });

        userProcessingMap.set(userId, nextTask);

    })

}