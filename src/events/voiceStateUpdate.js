const getVoiceStateChange = require("@handlers/voiceStates/getVoiceStateChange");
const deleteInactiveVoiceEmbeds = require("@modules/voiceActivity/handlers/deleteInactiveVoiceEmbeds");
const voiceDeleteEmbed = require("@modules/voiceActivity/handlers/voiceDeleteEmbed");
const voiceJoin = require("@modules/voiceActivity/handlers/voiceJoin");
const isBotAdmin = require("@utils/discord/isBotAdmin");
const { Events } = require("discord.js");

module.exports = {
    name: Events.VoiceStateUpdate,
    once: false,
    async execute(oldState, newState) {
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
    }
}