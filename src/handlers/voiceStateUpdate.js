// voiceStateUpdate.js

const { checkVoiceAdmin } = require('../module/checkAdminPermissionOn');
const deleteEmbedOnVoiceLeave = require('../events/voiceChannelEmbed/handlers/deleteEmbedOnVoiceLeave');
const voiceJoinEmbed = require('../events/voiceChannelEmbed/handlers/voiceJoinEmbed');

async function handleVoiceStateUpdate(oldState, newState) {
    try {
        if (!checkVoiceAdmin(newState) || !checkVoiceAdmin(oldState)) return; // Wave 봇이 관리자 권한 받았는지 체크

        // 입장 조건문
        if (!oldState.channel && newState.channel) {
            await voiceJoinEmbed(oldState, newState);

            // 채널 이동 조건문
        } else if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id) {
            await voiceJoinEmbed(oldState, newState);

            // 퇴장 조건문
        } else if (oldState.channel && !newState.channel) {
            await deleteEmbedOnVoiceLeave(oldState);

        };

    } catch (error) {
        console.error('handleVoiceStateUpdate 에러 : ', error);
    };
};

module.exports = { handleVoiceStateUpdate };