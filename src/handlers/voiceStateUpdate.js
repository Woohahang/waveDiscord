const voiceJoin = require('../modules/voiceActivity/handlers/voiceJoin');
const voiceDeleteEmbed = require('../modules/voiceActivity/handlers/voiceDeleteEmbed');
const deleteInactiveVoiceEmbeds = require('../modules/voiceActivity/handlers/deleteInactiveVoiceEmbeds');
const isBotAdmin = require('@utils/discord/isBotAdmin');
const logger = require('@utils/logger');

function getVoiceStateChange(oldState, newState) {
    if (!oldState.channel && newState.channel)
        return 'voiceJoin';

    if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id)
        return 'voiceMove';

    if (oldState.channel && !newState.channel)
        return 'voiceExit';
};

module.exports = async (oldState, newState) => {
    if (!isBotAdmin(newState.guild) || !isBotAdmin(oldState.guild)) return;

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
};