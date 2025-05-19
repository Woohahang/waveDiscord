const deleteUserInfoEmbed = require("@modules/voiceActivity/handlers/deleteUserInfoEmbed");

async function voiceExitHandler(oldState) {
    await deleteUserInfoEmbed(oldState);
}

module.exports = voiceExitHandler;