const deleteInactiveVoiceEmbeds = require("@modules/voiceActivity/handlers/deleteInactiveVoiceEmbeds");
const voiceJoin = require("@modules/voiceActivity/handlers/voiceJoin");

async function voiceJoinHandler(newState) {
    await voiceJoin(newState);
    await deleteInactiveVoiceEmbeds(newState);
}

module.exports = voiceJoinHandler;