// deleteEmbed.js

const { clientId } = require('../../../../../config.json');

async function deleteEmbed(State, member) {

    const channel = State.channel;
    if (!channel) return; // 음성 채널 접속 상태에서 관리자가 채널 삭제하면 예외 발생함 ;;

    const displayName = member.nickname ? member.nickname : member.user.globalName;

    const messages = await channel.messages.fetch({ limit: 15 });

    if (!messages) return;

    // 내 봇(wave) 가 보낸 임베드
    const waveEmbeds = messages.filter(message => message.author.id === clientId && message.embeds.length > 0);

    try {
        waveEmbeds.forEach(message => {
            message.embeds.forEach(embed => {

                if (embed.author && member.user.displayAvatarURL() === embed.author.iconURL && embed.author.name == displayName) {

                    if (message) message.delete().catch(error => console.error('메시지를 삭제하지 못 했습니다.'));
                };
            });
        });
    } catch (error) {
        console.error('deleteEmbed.js 에러 : ' + error);
    };

};

module.exports = { deleteEmbed };