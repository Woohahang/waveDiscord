const { voiceJoin } = require('../events/voiceChannel/voiceJoinMessage');
const { voiceExit } = require('../events/voiceChannel/voiceExit');
const { checkVoiceAdmin } = require('../module/checkAdminPermissionOn');

const userMessageId = new Map();

async function handleVoiceStateUpdate(oldState, newState) {


    // 사용자가 음성 채널 입장했을 경우
    if (!oldState.channel && newState.channel) {
        try {
            if (!checkVoiceAdmin(newState)) return; // 봇이 관리자 권한을 받았는지 체크

            const messageId = await voiceJoin(newState); // 등록 된 닉네임 전송 음성 채널에 전송
            userMessageId.set(newState.id, messageId); // 전송한 메시지 id Map() 저장

        } catch (error) {
            console.error('voiceJoin error:', error);
        };
    }

    // 사용자가 음성 채널에서 나간 경우
    else if (oldState.channel && !newState.channel) {
        try {
            if (!checkVoiceAdmin(oldState)) return; // 봇이 관리자 권한을 받았는지 체크

            const messageId = userMessageId.get(oldState.id);

            if (messageId) {
                await voiceExit(oldState, messageId); // 전송한 메시지 삭제
                userMessageId.delete(oldState.id); // 전송한 메시지 id Map() 삭제
            };

        } catch (error) {
            console.error('voiceExit error:', error);
        };
    };

}

module.exports = { handleVoiceStateUpdate }