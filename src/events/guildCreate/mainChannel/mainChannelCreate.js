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

        const channelType = 'mainChannel';

        // 길드 인스턴스 생성
        const guildSettings = new GuildSettings(guild.id);

        // 메인 채널 id 저장
        await guildSettings.saveChannelId(channelType, channel.id);

    } catch (error) {
        console.error('mainChannelCreate.js 에러 : ', error);
    };
};