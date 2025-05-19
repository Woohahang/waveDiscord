const cleanupUserInfoEmbeds = require("@modules/voiceActivity/handlers/cleanupUserInfoEmbeds");
const deleteUserInfoEmbed = require("@modules/voiceActivity/handlers/deleteUserInfoEmbed");
const sendUserInfoEmbed = require("@modules/voiceActivity/handlers/sendUserInfoEmbed");

async function voiceMoveHandler(oldState, newState) {
    await sendUserInfoEmbed(newState);
    await cleanupUserInfoEmbeds(newState);
    await deleteUserInfoEmbed(oldState);
}

module.exports = voiceMoveHandler;