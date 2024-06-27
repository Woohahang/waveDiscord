const { clientId } = require('../../../../../../config.json');

async function deleteOldMessages(channel) {
    try {
        // 채널의 메세지들을 가지고 옵니다.
        const messages = await channel.messages.fetch({ limit: 20 });

        const waveMessages = messages.filter(message => message.author.id === clientId);

        // waveMessages를 배열로 변환한 후 최근 두 개의 메시지를 제외한 나머지를 선택합니다.
        const messagesArray = Array.from(waveMessages.values());
        const messagesToDelete = messagesArray.slice(2);

        // 각 메시지 삭제 작업을 프로미스로 변환합니다.
        const deletePromises = messagesToDelete.map(message => message.delete());

        // 모든 메시지 삭제 작업이 완료될 때까지 기다립니다.
        await Promise.all(deletePromises);

        console.log('모든 메세지 완료');

    } catch (error) {
        console.error('관리자 채널 업데이트 도중 예외 발생');
        console.error('adminChannelUpDate.deleteOldMessages 함수 예외 : ', error);
    };
};

module.exports = deleteOldMessages;