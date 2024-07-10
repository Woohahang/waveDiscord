const { clientId } = require('../../../../../../config.json');

/**
 * Wave 메세지를 모두 제거합니다.
 * 
*/
async function deleteWaveMessages(channel) {
    try {
        // 최근 30개의 메시지를 가져옵니다.
        const messages = await channel.messages.fetch({ limit: 30 });

        // Wave 봇이 보낸 메시지를 필터링합니다.
        const waveMessages = messages.filter(message => message.author.id === clientId);

        // Wave 봇이 보낸 메시지를 삭제합니다.
        await Promise.all(waveMessages.map(message => message.delete()));
    } catch (error) {
        console.error('deleteWaveMessages.js 예외 : ', error);
    };
};

module.exports = deleteWaveMessages;