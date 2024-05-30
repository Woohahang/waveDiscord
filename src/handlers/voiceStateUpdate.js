// voiceStateUpdate.js

const { checkVoiceAdmin } = require('../module/checkAdminPermissionOn');

const voiceJoinEmbed = require('../events/voiceChannelEmbed/handlers/voiceJoinEmbed');
const voiceDeleteEmbed = require('../events/voiceChannelEmbed/handlers/voiceDeleteEmbed');

async function handleVoiceStateUpdate(oldState, newState) {
    try {
        if (!checkVoiceAdmin(newState) || !checkVoiceAdmin(oldState)) return; // Wave 봇이 관리자 권한 받았는지 체크

        // 유저가 채널 입장하면 작동
        if (!oldState.channel && newState.channel) {
            // 임베드 전송
            await voiceJoinEmbed(oldState, newState);

            // 유저가 채널 이동하면 작동
        } else if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id) {
            // 임베드 삭제 and 전송
            await voiceJoinEmbed(oldState, newState);

            // 유저가 퇴장하면 작동
        } else if (oldState.channel && !newState.channel) {
            // 임베드 삭제
            await voiceDeleteEmbed(oldState);

        };

    } catch (error) {
        console.error('handleVoiceStateUpdate 에러 : ', error);
    };
};

module.exports = { handleVoiceStateUpdate };