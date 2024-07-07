const { clientId } = require('../../../../../../../config.json')

const adminRequestMessage =
    '## 관리자 권한이 필요합니다.' + '\n' +
    '> * 현재 **Wave**가 제공하는 기능을 사용하려면 관리자 권한이 필요합니다.' + '\n' +
    '> * **Wave**를 서버에서 추방한 후, 다시 관리자 권한을 부여한 상태로 초대해 주시겠어요?';

module.exports = async (guild) => {
    try {
        // 서버 소유자의 ID를 가져옵니다.
        const ownerId = guild.ownerId;

        // 서버 소유자의 멤버 객체를 가져옵니다.
        const owner = await guild.members.fetch(ownerId);

        // 서버 소유자와의 DM 채널을 생성합니다.
        const dmChannel = await owner.createDM();

        // 최근 30개의 메시지를 가져옵니다.
        const channelMessages = await dmChannel.messages.fetch({ limit: 30 });

        // Wave 봇이 보낸 메시지를 필터링합니다.
        const waveMessages = channelMessages.filter(message => message.author.id === clientId);

        // Wave 봇이 보낸 메시지를 삭제합니다.
        await Promise.all(waveMessages.map(message => message.delete()));

        // 서버 소유자에게 관리자 권한 요청 메시지를 보냅니다.
        await owner.send(adminRequestMessage);
    } catch (error) {
        console.error('adminPermissionRequest.js 에러 : ', error);
    };
};