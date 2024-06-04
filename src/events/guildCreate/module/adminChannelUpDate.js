// adminChannelUpDate.js

const { adminMessage } = require('../module/adminMessage');
const { messagesDelete } = require('../../../module/common/messagesDelete');

// 관리자 채널 업데이트
async function adminChannelUpDate(interaction, guildSettings) {

    const guild = interaction.guild;
    const channelType = 'adminChannel';

    // 길드 관리자 채널 ID 얻기
    const adminChannelId = await guildSettings.loadChannelId(channelType);

    try {
        // 관리자 채널 객체 얻기
        const channel = await guild.channels.fetch(adminChannelId);

        // 메세지 전송 시도
        const messageIds = await adminMessage(channel);

        if (messageIds.length === 2) {
            // 방금 보낸 메세지 제외, 나머지 삭제
            await messagesDelete(channel, messageIds);
        } else {
            interaction.reply({ content: '오류가 발생해 이전 메시지를 삭제하지 못했습니다. 번거롭겠지만 이전 메시지 삭제를 부탁드립니다.', ephemeral: true })
        };

    } catch (error) {
        console.error('adminChannelUpDate.js 에러 : ', error);
    };

};

module.exports = adminChannelUpDate;