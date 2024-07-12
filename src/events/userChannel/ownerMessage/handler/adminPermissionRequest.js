const adminRequestMessage = require('../modules/adminRequestMessage');
const createInviteButtons = require('../modules/createInviteButtons');
const deleteWaveMessages = require('../../modules/deleteWaveMessages');

/**
 * 서버 소유자에게 관리자 권한 요청 메시지를 보냅니다.
 * 
 * @param {Guild} guild - 봇이 추가된 디스코드 서버 객체
 */
module.exports = async (guild) => {
    try {
        // 서버 소유자의 ID를 가져옵니다.
        const ownerId = guild.ownerId;

        // 서버 소유자의 멤버 객체를 가져옵니다.
        const owner = await guild.members.fetch(ownerId);

        // 서버 소유자와의 DM 채널을 생성합니다.
        const channel = await owner.createDM();

        // Wave 메세지를 삭제합니다.
        await deleteWaveMessages(channel);

        // 서버 소유자에게 관리자 권한 요청 메시지를 보냅니다.
        await owner.send({
            content: adminRequestMessage,
            components: [createInviteButtons()]
        });

    } catch (error) {
        console.error('adminPermissionRequest.js 예외 : ', error);
    };
};