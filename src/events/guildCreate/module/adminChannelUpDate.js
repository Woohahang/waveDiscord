// adminChannelUpDate.js

const { adminMessage } = require('../module/adminMessage');
const deleteMessagesExcept = require('../../../module/common/deleteMessagesExcept');

// 관리자 채널 업데이트
async function adminChannelUpDate(guild, { adminChannelId }) {
    try {
        // 관리자 채널 객체 얻기
        const channel = await guild.channels.fetch(adminChannelId);

        // 메세지 전송 시도
        const messageIds = await adminMessage(channel);

        await deleteMessagesExcept(channel, messageIds);

    } catch (error) {
        console.error('adminChannelUpDate.js 에러 : ', error);
    };
};

module.exports = adminChannelUpDate;