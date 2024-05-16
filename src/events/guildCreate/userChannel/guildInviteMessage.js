async function guildInviteMessage(guild) {
    try {
        // 서버 주인의 id
        const ownerId = guild.ownerId;

        // 서버 주인의 객체
        const owner = await guild.members.fetch(ownerId);

        // 서버 주인의 1:1 DM 채널
        const dmChannel = await owner.createDM();

        // 이전 메시지 전부 삭제 (최적화)
        const messages = await dmChannel.messages.fetch({ limit: 5 });
        await Promise.all(messages.map(message => message.delete()));

        const message = createInviteMessage();
        await owner.send(message);
    } catch (error) {
        console.error('Error sending guild invite message:', error);
    };
};

function createInviteMessage() {
    return `## 반가워요 ! 먼저 Wave 를 초대해주셔서 감사합니다.
* 서버에 초대되었지만, 관리자 권한을 받지 못하여 제 기능을 수행할 수 없습니다.

## ⭐ 관리자 권한 필요
* 이용자들의 편리를 위해 만들어진 채팅 채널을 초대받으면 자동으로 개설해요 !
* 음성 채널에 입장했을 때, 입장한 채팅 채널에 닉네임 정보를 표기해요 !

## 따라서, 현재의 기능에는 관리자 권한이 필요해요.
🟢 Wave 를 서버에서 추방한 후 다시 관리자 권한을 체크한 상태로 초대해 주시겠어요?`;
}

module.exports = { guildInviteMessage };
