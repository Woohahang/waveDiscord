// mainChannelCreate.js

const { PermissionsBitField } = require('discord.js');
const GuildSettings = require('../../../services/GuildSettings');

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

module.exports = async (guild) => {
    try {
        // 메인 채널 생성
        const channel = await createMainChannel(guild);

        // 길드 인스턴스 생성 및 채널 Id 저장
        const guildSettings = new GuildSettings(guild.id);
        await guildSettings.saveChannelId('mainChannel', channel.id);

        return channel;
    } catch (error) {
        console.error('mainChannelCreate.js 에러 : ', error);
    };
};