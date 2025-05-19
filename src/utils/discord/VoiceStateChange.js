/**
 * 음성 상태 변화 판단 유틸
 * @module voiceStateChange
 */

const VoiceStateChange = {
    /**
     * 음성 채널 입장 여부
     * @param {VoiceState} oldState 
     * @param {VoiceState} newState 
     * @returns {boolean}
     */
    isJoin: (oldState, newState) => !oldState.channel && newState.channel,

    /**
     * 음성 채널 퇴장 여부
     * @param {VoiceState} oldState 
     * @param {VoiceState} newState 
     * @returns {boolean}
     */
    isExit: (oldState, newState) => oldState.channel && !newState.channel,

    /**
     * 음성 채널 이동 여부
     * @param {VoiceState} oldState 
     * @param {VoiceState} newState 
     * @returns {boolean}
     */
    isMove: (oldState, newState) =>
        oldState.channel && newState.channel &&
        oldState.channel.id !== newState.channel.id
};

module.exports = VoiceStateChange;