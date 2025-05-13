const voiceJoin = require('../events/voiceChannelEmbed/handlers/voiceJoin');
const voiceDeleteEmbed = require('../events/voiceChannelEmbed/handlers/voiceDeleteEmbed');
const deleteInactiveVoiceEmbeds = require('../events/voiceChannelEmbed/handlers/deleteInactiveVoiceEmbeds');
const isBotAdmin = require('@utils/discord/isBotAdmin');

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
        if (!isBotAdmin(newState.guild) || !isBotAdmin(oldState.guild)) return; //봇이 관리자 권한 받았는지 체크

        const voiceStateChange = getVoiceStateChange(oldState, newState);

        switch (voiceStateChange) {
            case 'voiceJoin': // 음성 채널 입장
                await voiceJoin(newState);
                await deleteInactiveVoiceEmbeds(newState);
                break;

            case 'voiceMove': // 음성 채널 이동
                await voiceJoin(newState);
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