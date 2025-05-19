const fetchBotMessages = require('@utils/discord/fetchBotMessages');
const getDisplayName = require('@utils/discord/getDisplayName');
const logger = require('@utils/logger');

// 채널에 있는 멤버들의 이름을 가져오는 함수
function getChannelMembers(channel) {
    return channel.members.map(member => getDisplayName(member));
};

// 채널에 없는 멤버의 임베드만 가지고 옵니다.
function filterMessagesToDelete(messages, channelMembers) {
    return messages.filter(message =>
        message.embeds.some(embed =>
            embed.author && !channelMembers.includes(embed.author.name)
        )
    );
};

/* 채널에 없는 멤버 정보 삭제 (여러 이유로 삭제 되었어야할 누락 된 메세지를 삭제하는 용도) */
module.exports = async (newState) => {

    // 입장한 채널 객체를 가지고 옵니다.
    const channel = newState.channel;
    if (!channel) return;

    try {
        // 해당 채널에서 Wave 봇이 보낸 메시지를 가지고 옵니다.
        const messages = await fetchBotMessages(channel);

        // 채널에 있는 멤버들의 이름을 가지고 옵니다.
        const channelMembers = getChannelMembers(channel);

        // 채널에 없는 멤버의 임베드만 가지고 옵니다.
        const messagesToDelete = filterMessagesToDelete(messages, channelMembers);

        // 채널에 없는 멤버의 임베드 병렬 삭제
        await Promise.all(messagesToDelete.map(message => message.delete()))
            .catch(error => {
                // 예외 처리: 채널이나 메시지가 이미 삭제된 경우 무시
                // 10003: Unknown Channel, 10008: Unknown Message
                if (error.code === 10008 || error.code === 10003) return;
                throw error;
            });

    } catch (error) {
        logger.error('[deleteInactiveVoiceEmbeds] 음성채널 이동 중 오류', {
            stack: error.stack
        });
    };
};