const { PermissionsBitField } = require('discord.js');

// 주어진 길드(guild)에서 새로운 Wave 메인 채널을 생성합니다.
async function createMainChannel(guild) {
    try {
        return await guild.channels.create({
            name: '📘ㆍwave',  // 채널 이름을 지정합니다.
            type: 0, // 채널 타입을 텍스트 채널로 설정합니다
            permissionOverwrites: [{
                id: guild.roles.everyone.id, // @everyone 역할의 ID를 가져옵니다.
                deny: [PermissionsBitField.Flags.SendMessages], // @everyone 역할에 채널 보기(View Channel) 권한을 거부합니다.
            }],
        });
    } catch (error) {
        throw new Error(`[createMainChannel] 메인 채널 생성 중 오류: ${error.message}`);
    }
};

module.exports = createMainChannel;