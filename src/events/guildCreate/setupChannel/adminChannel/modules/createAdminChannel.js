const { PermissionsBitField } = require('discord.js');

// 주어진 길드(guild)에서 새로운 관리자 채널을 생성합니다.
async function createAdminChannel(guild) {
    try {
        return await guild.channels.create({
            name: '📘ㆍwave 관리자', // 채널 이름을 지정합니다.
            type: 0, // 채널 타입을 텍스트 채널로 설정합니다
            permissionOverwrites: [{
                id: guild.roles.everyone.id, // @everyone 역할의 ID를 가져옵니다.
                deny: [PermissionsBitField.Flags.ViewChannel], // @everyone 역할에 채널 보기(View Channel) 권한을 거부합니다.
            }],
        });
    } catch (error) {
        console.error('createAdminChannel.js 예외 : ', error);
        throw error;
    };
};

module.exports = createAdminChannel;