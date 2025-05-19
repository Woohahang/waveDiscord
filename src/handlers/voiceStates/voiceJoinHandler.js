const cleanupUserInfoEmbeds = require("@modules/voiceActivity/handlers/cleanupUserInfoEmbeds");
const sendUserInfoEmbed = require("@modules/voiceActivity/handlers/sendUserInfoEmbed");

async function voiceJoinHandler(newState) {
    await sendUserInfoEmbed(newState);
    await cleanupUserInfoEmbeds(newState);
}

module.exports = voiceJoinHandler;