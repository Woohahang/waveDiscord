const voiceDeleteEmbed = require("@modules/voiceActivity/handlers/voiceDeleteEmbed");

async function voiceExitHandler(oldState) {
    await voiceDeleteEmbed(oldState);
}

module.exports = voiceExitHandler;