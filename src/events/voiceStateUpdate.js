const voiceExitHandler = require("@handlers/voiceStates/voiceExitHandler");
const voiceJoinHandler = require("@handlers/voiceStates/voiceJoinHandler");
const voiceMoveHandler = require("@handlers/voiceStates/voiceMoveHandler");
const isBotAdmin = require("@utils/discord/isBotAdmin");
const VoiceStateChange = require("@utils/discord/VoiceStateChange");
const { Events } = require("discord.js");

module.exports = {
    name: Events.VoiceStateUpdate,
    once: false,
    async execute(oldState, newState) {
        if (!isBotAdmin(newState.guild) || !isBotAdmin(oldState.guild)) return;

        if (VoiceStateChange.isJoin(oldState, newState)) await voiceJoinHandler(newState);
        else if (VoiceStateChange.isMove(oldState, newState)) await voiceMoveHandler(oldState, newState);
        else if (VoiceStateChange.isExit(oldState, newState)) await voiceExitHandler(oldState);
    }
}