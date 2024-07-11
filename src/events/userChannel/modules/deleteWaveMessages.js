const { clientId } = require('../../../../../config.json');

/**
 * 채널에서 Wave 봇이 보낸 메시지를 모두 제거합니다.
 * 
 * @param {TextChannel|DMChannel} channel - 메시지를 삭제할 디스코드 채널 객체.
 */
async function deleteWaveMessages(channel) {
    try {
        // 최근 30개의 메시지를 가져옵니다.
        const messages = await channel.messages.fetch({ limit: 30 });

        // 최근 30개의 메시지 중에서 Wave 봇이 보낸 메시지를 필터링합니다.
        const waveMessages = messages.filter(message => message.author.id === clientId);

        // 필터링된 Wave 봇의 메시지를 모두 삭제합니다.
        await Promise.all(waveMessages.map(message => message.delete()));
    } catch (error) {
        console.error('deleteWaveMessages.js 예외 : ', error);
    };
};

module.exports = deleteWaveMessages;