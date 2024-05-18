// mainChannelCreate.js

const { PermissionsBitField } = require('discord.js');
const GuildSettings = require('../../../services/GuildSettings');

module.exports = async (guild) => {
    try {
        // 길드 초대시 채팅 채널 생성
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

        // 길드 DB 찾기 or 생성
        const guildSettings = new GuildSettings(guild.id);
        await guildSettings.loadOrCreate();

        // Wave 채널 id
        const channelId = channel.id;

        await guildSettings.updateMainChannelId(channelId);

    } catch (error) {
        console.error('mainChannelCreate.js 에러 : ', error);
    };
};