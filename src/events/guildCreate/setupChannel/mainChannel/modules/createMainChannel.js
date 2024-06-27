const { PermissionsBitField } = require('discord.js');
// const GuildSettings = require('../../../../services/GuildSettings');

async function createMainChannel(guild) {
    const channel = await guild.channels.create({
        name: '📘ㆍwave',
        type: 0,
        permissionOverwrites: [
            {
                id: guild.roles.everyone.id,
                deny: [PermissionsBitField.Flags.SendMessages], // 메시지 보내기 권한을 끕니다.
            },
        ],
    });

    return channel;
};

module.exports = createMainChannel;