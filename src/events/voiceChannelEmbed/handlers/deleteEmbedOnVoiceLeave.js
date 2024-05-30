// deleteEmbedOnVoiceLeave.js

const { deleteEmbed } = require('../modules/deleteEmbed');

module.exports = async (oldState) => {
    try {
        await deleteEmbed(oldState);

    } catch (error) {
        console.error('deleteEmbedOnVoiceLeave.js 에러 : ', error);
    };
};