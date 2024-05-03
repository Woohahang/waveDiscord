module.exports = async (guild) => {
    const ownerId = guild.ownerId;

    // 길드 오너 객체
    const owner = await guild.members.fetch(ownerId);

    // 오너 DM 객체
    const dmChannel = await owner.createDM();

    // 이전 메시지 전부 삭제
    const messages = await dmChannel.messages.fetch({ limit: 3 });
    messages.forEach(message => {
        message.delete();
    })

    // 메시지 내용
    let message = '## 반가워요 ! 먼저 Wave 를 초대해주셔서 감사합니다.\n';
    message += '* 서버에 초대되었지만, 관리자 권한을 받지 못하여 제 기능을 수행할 수 없습니다.\n\n'

    message += '## ⭐ 관리자 권한 필요 \n'
    message += '* 이용자들의 편리를 위해 만들어진 채팅 채널 하나를 초대받으면 자동으로 개설해요 !\n'
    message += '* 음성 채널에 입장했을 때, 입장한 채팅 채널에 닉네임 정보를 표기해요 !\n'
    message += '* [계획] Wave 가 자동으로 닉네임과 일치하는 티어를 표기합니다 !\n'
    message += '* [계획] 게임의 종류를 관리자들이 제거 또는 추가 할 수 있습니다 !\n\n'

    message += '## 따라서, 현재의 기능과 앞으로의 계획에 있어 관리자 권한이 필요해요.\n'
    message += '🟢 Wave 를 서버에서 추방한 후 다시 관리자 권한을 체크한 상태로 초대해 주시겠어요?\n'

    // 메시지 전송
    await owner.send(message);
};