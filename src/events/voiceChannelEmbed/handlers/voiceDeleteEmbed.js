// voiceDeleteEmbed.js

const { clientId } = require('../../../../../config.json');

module.exports = async (oldState) => {

    const channel = oldState.channel;
    const member = oldState.member;

    // 서버 별명 또는 유저 닉네임
    const displayName = member.nickname ? member.nickname : member.user.globalName;

    try {
        const messages = await channel.messages.fetch({ limit: 20 });
        if (!messages) return;

        // 내 봇(wave) 가 보낸 임베드
        const waveEmbeds = messages.filter(message => message.author.id === clientId && message.embeds.length > 0);

        waveEmbeds.forEach(message => {
            message.embeds.forEach(embed => {

                if (embed.author && member.user.displayAvatarURL() === embed.author.iconURL && embed.author.name == displayName) {

                    if (message) message.delete();

                };
            });
        });

    } catch (error) {
        // 'Unknown Channel' 에러 무시(음성 채널 접속 상태에서 채널 삭제)
        if (error.rawError && error.rawError.code !== 10003) {
            console.error('voiceDeleteEmbed.js 에러 : ', error);
        };
    };
};