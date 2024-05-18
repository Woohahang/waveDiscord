// deleteEmbedOnVoiceLeave.js

const { deleteEmbed } = require('../modules/deleteEmbed');

module.exports = async (oldState) => {
    try {
        const member = oldState.member;
        await deleteEmbed(oldState, member);
    } catch (error) {
        console.error('deleteEmbedOnVoiceLeave.js 에러 : ', error);
    };
};