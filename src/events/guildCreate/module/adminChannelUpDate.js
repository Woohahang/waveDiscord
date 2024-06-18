// adminChannelUpDate.js

const { adminMessage } = require('../module/adminMessage');
const deleteMessagesExcept = require('../../../module/common/deleteMessagesExcept');

// 관리자 채널 업데이트
async function adminChannelUpDate(interaction) {
    try {
        // 상호작용 받은 채널 === Wave 관리자 채널
        const channel = interaction.channel;

        // 메세지 전송 및 전송된 메세지 ID 목록 가져오기
        const messageIds = await adminMessage(channel);

        // 전송 된 메세지 제외 나머지 삭제
        await deleteMessagesExcept(channel, messageIds);

    } catch (error) {
        console.error('adminChannelUpDate.js 에러 : ', error);
    };
};

module.exports = adminChannelUpDate;