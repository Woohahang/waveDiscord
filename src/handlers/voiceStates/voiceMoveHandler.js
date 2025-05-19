const deleteInactiveVoiceEmbeds = require("@modules/voiceActivity/handlers/deleteInactiveVoiceEmbeds");
const voiceDeleteEmbed = require("@modules/voiceActivity/handlers/voiceDeleteEmbed");
const voiceJoin = require("@modules/voiceActivity/handlers/voiceJoin");

async function voiceMoveHandler(oldState, newState) {
    await voiceJoin(newState);
    await deleteInactiveVoiceEmbeds(newState);
    await voiceDeleteEmbed(oldState);
}

module.exports = voiceMoveHandler;