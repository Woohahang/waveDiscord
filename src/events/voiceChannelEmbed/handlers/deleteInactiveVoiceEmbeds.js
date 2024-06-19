const { clientId } = require('../../../../../config.json');

function displayName(member) {
    return member.nickname || member.user.globalName;
}

// 채널에 있는 멤버들의 이름을 가져오는 함수
function getChannelMembers(channel) {
    return channel.members.map(member => displayName(member));
};

// Wave가 보낸 메시지 중 임베드 메시지만 필터링하는 함수
function filterWaveMessages(messages) {
    return messages.filter(message => message.author.id === clientId);
};

// 채널에 없는 멤버의 임베드만 가지고 옵니다.
function filterMessagesToDelete(messages, channelMembers) {
    return messages.filter(message =>
        message.embeds.some(embed =>
            embed.author && !channelMembers.includes(embed.author.name)
        )
    );
};

// 주 함수
module.exports = async (newState) => {
    try {
        // 입장한 채널 객체를 가지고 옵니다.
        const { channel } = newState;
        if (!channel) return;

        // 최근 메세지 20개를 가지고 옵니다.
        const messages = await channel.messages.fetch({ limit: 20 });
        if (!messages) return;

        // 채널에 있는 멤버들의 이름을 가지고 옵니다.
        const channelMembers = getChannelMembers(channel);

        // 채널 메세지 중에 Wave 메세지만 가지고 옵니다.
        const waveMessages = filterWaveMessages(messages);

        // 채널에 없는 멤버의 임베드만 가지고 옵니다.
        const messagesToDelete = filterMessagesToDelete(waveMessages, channelMembers);

        // allMessagesToDelete의 모든 메세지 병렬 삭제
        await Promise.all(messagesToDelete.map(message => message.delete()));

    } catch (error) {
        if (error.code === 10008) return; // Unknown Message
        console.error('deleteInactiveVoiceEmbeds.js 예외:', error);
    };
};

// 음성 채널 입장하면

/* 음성 채널 입장
 음성 채널에 없는 사람의 임베드 모두 삭제
 본인 중복 메세지 모두 제거
*/

/* 음성 채널 퇴장
 본인 메세지 제거
*/