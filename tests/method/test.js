
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


// 유저 id 의 권한 비트필드가 어떻게 되는지 체크 : 용도 -> wave 에게 관리자 줬을 때 비트필드 값 궁금해서
client.on('messageCreate', async message => {
    if (message.member.id === '282793473462239232' && message.content === "1") {

        const userIdToCheck = '1227561479801409566'; // 권한을 확인하고자 하는 사용자의 ID
        const memberToCheck = message.guild.members.cache.get(userIdToCheck);
        if (memberToCheck) {
            console.log(memberToCheck.permissions);
        } else {
            console.log(`사용자 ${userIdToCheck}를 찾을 수 없습니다.`);
        }

    }
});