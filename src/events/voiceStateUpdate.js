const getVoiceStateChange = require("@handlers/voiceStates/getVoiceStateChange");
const deleteInactiveVoiceEmbeds = require("@modules/voiceActivity/handlers/deleteInactiveVoiceEmbeds");
const voiceDeleteEmbed = require("@modules/voiceActivity/handlers/voiceDeleteEmbed");
const voiceJoin = require("@modules/voiceActivity/handlers/voiceJoin");
const isBotAdmin = require("@utils/discord/isBotAdmin");
const VoiceStateChange = require("@utils/discord/VoiceStateChange");
const { Events } = require("discord.js");

module.exports = {
    name: Events.VoiceStateUpdate,
    once: false,
    async execute(oldState, newState) {
        if (!isBotAdmin(newState.guild) || !isBotAdmin(oldState.guild)) return;

        if (VoiceStateChange.isJoin) {
            await voiceJoin(newState);
            await deleteInactiveVoiceEmbeds(newState);
        }

        else if (VoiceStateChange.isExit) {
            await voiceDeleteEmbed(oldState);
        }

        else if (VoiceStateChange.isMove) {
            await voiceJoin(newState);
            await deleteInactiveVoiceEmbeds(newState);
            await voiceDeleteEmbed(oldState);
        }

    }
}