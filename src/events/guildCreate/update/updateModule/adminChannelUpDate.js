const sendAdminMessage = require('../../setupChannel/adminChannel/modules/sendAdminMessage');
const deleteOldMessages = require('../updateModule/deleteOldMessages');

async function adminChannelUpDate(interaction, guildData) {
    try {
        // 상호작용 받은 관리자 채널 객체를 가지고 옵니다.
        const channel = interaction.channel;

        // 관리자 채널에 메세지를 보냅니다.
        await sendAdminMessage(channel, guildData);

        // 이 전에 보냈던 Wave 메세지를 삭제합니다.
        await deleteOldMessages(channel);

    } catch (error) {
        console.error('adminChannelUpDate.js 에러 : ', error);
    };
};

module.exports = adminChannelUpDate;