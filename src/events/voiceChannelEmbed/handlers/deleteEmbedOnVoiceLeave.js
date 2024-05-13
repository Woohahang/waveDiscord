const { deleteEmbed } = require('../modules/deleteEmbed');

async function deleteEmbedOnVoiceLeave(oldState) {
    const member = oldState.member;

    await deleteEmbed(oldState, member);

};

module.exports = { deleteEmbedOnVoiceLeave };