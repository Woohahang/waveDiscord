// deleteEmbed.js

const { clientId } = require('../../../../../config.json');

async function deleteEmbed(State, member) {
    const channel = State.channel;
    const displayName = member.nickname ? member.nickname : member.user.globalName;


    const messages = await channel.messages.fetch({ limit: 15 });
    if (!messages) return;

    // 내 봇(wave) 가 보낸 임베드
    const waveEmbeds = messages.filter(message => message.author.id === clientId && message.embeds.length > 0);

    waveEmbeds.forEach(message => {
        message.embeds.forEach(embed => {
            if (embed.author?.url.includes(member.user.avatar) && embed.author?.name == displayName) {
                if (message) message.delete().catch(error => console.error('메시지를 삭제하지 못 했습니다.'));
            };
        });
    });

};

module.exports = { deleteEmbed };



/* .includes() 란,
embed.author?.url.includes(member.user.avatar)
embed.author?.url 안에 member.user.avatar 포함 되어 있으면 true
embed.author?.url === https://cdn.discordapp.com/avatars/386134294508339210/bbb8107f2e9b6e961be173b0601c99ac.webp
member.user.avatar === bbb8107f2e9b6e961be173b0601c99ac
*/
