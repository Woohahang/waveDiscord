const { PermissionsBitField } = require('discord.js');

async function createAdminChannel(guild) {
    const channel = await guild.channels.create({
        name: '📘ㆍwave 관리자',
        type: 0,
        permissionOverwrites: [{
            id: guild.roles.everyone.id,
            deny: [PermissionsBitField.Flags.ViewChannel], // 메시지 보내기 권한을 끕니다.
        }],
    });

    return channel;
};

module.exports = createAdminChannel;