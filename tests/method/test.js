
// 현재 채널의 권한 보기
client.on('messageCreate', async message => {

    const channel = message.channel;
    // 현재 채널, 모두에게, 안 보이게 하기
    channel.permissionOverwrites.create(channel.guild.roles.everyone, { ViewChannel: false });

    // 현재 채널, 모두, 메세지 작성 금지
    channel.permissionOverwrites.create(channel.guild.roles.everyone, { SendMessages: false });

    // 현재 채널의, 모든 역할
    const permissions = channel.permissionsFor(channel.guild.roles.everyone);

    // 다른 권한이 궁금하면 콘솔 찍어보기
    console.log(permissions.toArray());

});