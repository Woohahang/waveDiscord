// voiceStateUpdate.js

const { checkVoiceAdmin } = require('../module/checkAdminPermissionOn');

const voiceJoinEmbed = require('../events/voiceChannelEmbed/handlers/voiceJoinEmbed');
const voiceDeleteEmbed = require('../events/voiceChannelEmbed/handlers/voiceDeleteEmbed');
const deleteInactiveVoiceEmbeds = require('../events/voiceChannelEmbed/handlers/deleteInactiveVoiceEmbeds');

function getVoiceStateChange(oldState, newState) {
    if (!oldState.channel && newState.channel)
        return 'voiceJoin';

    if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id)
        return 'voiceMove';

    if (oldState.channel && !newState.channel)
        return 'voiceExit';
};

module.exports = async (oldState, newState) => {
    try {
        if (!checkVoiceAdmin(newState) || !checkVoiceAdmin(oldState)) return; // Wave 봇이 관리자 권한 받았는지 체크

        const voiceStateChange = getVoiceStateChange(oldState, newState);

        switch (voiceStateChange) {
            case 'voiceJoin': // 음성 채널 입장
                await voiceJoinEmbed(newState);
                await deleteInactiveVoiceEmbeds(newState);
                break;

            case 'voiceMove': // 음성 채널 이동
                await voiceJoinEmbed(newState);
                await deleteInactiveVoiceEmbeds(newState);
                await voiceDeleteEmbed(oldState);
                break;

            case 'voiceExit': // 음성 채널 퇴장
                await voiceDeleteEmbed(oldState);
                break;
        };

    } catch (error) {
        console.error('handleVoiceStateUpdate 예외 : ', error);
    };
};