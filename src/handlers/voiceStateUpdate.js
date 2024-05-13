const { checkVoiceAdmin } = require('../module/checkAdminPermissionOn');
const { sendEmbedOnVoiceJoin } = require('../events/voiceChannelEmbed/handlers/sendEmbedOnVoiceJoin');
const { moveEmbedOnVoiceChannelChange } = require('../events/voiceChannelEmbed/handlers/moveEmbedOnVoiceChannelChange');
const { deleteEmbedOnVoiceLeave } = require('../events/voiceChannelEmbed/handlers/deleteEmbedOnVoiceLeave');

async function handleVoiceStateUpdate(oldState, newState) {
    if (!checkVoiceAdmin(newState) || !checkVoiceAdmin(oldState)) return; // Wave 봇이 관리자 권한 받았는지 체크

    if (!oldState.channel && newState.channel) { // 입장 조건문
        await sendEmbedOnVoiceJoin(newState);

    } else if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id) { // 채널 이동 조건문
        await moveEmbedOnVoiceChannelChange(oldState, newState);

    } else if (oldState.channel && !newState.channel) { // 퇴장 조건문
        deleteEmbedOnVoiceLeave(oldState);
    };

};

module.exports = { handleVoiceStateUpdate };