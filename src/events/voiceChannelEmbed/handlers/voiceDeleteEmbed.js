// voiceDeleteEmbed.js

const { clientId } = require('../../../../../config.json');

/* 중복 된 유저 정보 메세지 삭제 */
module.exports = async (oldState) => {
    try {
        const member = oldState.member;
        const channel = oldState.channel;
        if (!channel) return;

        // 서버 별명 또는 유저 닉네임
        const displayName = member.nickname || member.user.globalName;

        const messages = await channel.messages.fetch({ limit: 20 });
        if (!messages) return;

        // Wave 가 보낸 메세지들
        const waveEmbeds = messages.filter(message => message.author.id === clientId && message.embeds.length > 0);

        // 중복된 유저 정보를 담고 있는 메시지들
        const duplicateUserInfo = waveEmbeds.filter(message =>
            message.embeds.some(embed => embed.author && member.user.displayAvatarURL() === embed.author.iconURL && embed.author.name === displayName)
        );

        // 메세지 삭제
        await Promise.all(duplicateUserInfo.map(message =>
            message.delete()
                .catch(error => {
                    handleDeleteError(error);
                })
        ));

    } catch (error) {
        handleFetchError(error);
    };
};

const handleFetchError = (error) => {
    if (error.rawError && error.rawError.code === 10003) return;
    console.error('voiceDeleteEmbed.js fetch 에러 : ', error);
};

const handleDeleteError = (error) => {
    if (error.rawError && error.rawError.code === 10003) return;
    if (error.code === 'ChannelNotCached') return;
    console.error('voiceDeleteEmbed.js, 메세지 삭제 중에 예외 발생: ', error);
};