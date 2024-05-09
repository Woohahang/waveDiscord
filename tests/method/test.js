
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



const { PermissionsBitField } = require('discord.js');

// 역할 확인하기
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.member.id === '282793473462239232' || !interaction.member.id === '386134294508339210') return;

    // 멤버 객체 가지고 오기
    const member = interaction.member;

    // 역할 객체 뭐 있는지 싹 다 확인 가능
    console.log(PermissionsBitField.Flags);

    // 관리자 권한 가지고 오기 없으면 언디파인
    const hasAdminRole = member.permissions.has(PermissionsBitField.Flags.Administrator);

    if (hasAdminRole) {
        console.log(`${interaction.user.tag}는 관리자 권한을 가지고 있습니다.`);
    } else {
        console.log(`${interaction.user.tag}는 관리자 권한을 가지고 있지 않습니다.`);
    };
});