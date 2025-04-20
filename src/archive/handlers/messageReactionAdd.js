// module.exports = async (reaction, user) => {
//     try {
//         if (user.bot || reaction.emoji.name !== '🌊') return;

//         // 반응을 누른 유저의 길드 멤버 정보를 가져옵니다.
//         const member = await reaction.message.guild.members.fetch(user.id);

//         const displayName = member.nickname ? member.nickname : member.user.globalName;
//         const d = reaction.message.embeds[0].author.name;

//         console.log(displayName === d);

//         // 반응 추가를 알리는 메시지를 채널에 보냅니다.
//         await reaction.message.channel.send({ content: '테스트', ephemeral: true });

//     } catch (error) {
//         console.error('messageReactionAdd.js 예외 : ', error);
//     };
// };