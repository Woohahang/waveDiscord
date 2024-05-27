// adminChannelCreate.js

const { PermissionsBitField } = require('discord.js');
const GuildSettings = require('../../../services/GuildSettings');

async function createAdminChannel(guild) {
    // 채널 생성 : 채팅 채널
    return await guild.channels.create({
        name: '📘ㆍwave 관리자',
        type: 0,
        permissionOverwrites: [
            {
                id: guild.roles.everyone.id,
                deny: [PermissionsBitField.Flags.ViewChannel], // 메시지 보내기 권한을 끕니다.
            },
        ],
    });
};

module.exports = async (guild) => {
    try {
        // 관리자 채널 생성
        const channel = await createAdminChannel(guild);

        // 채널 타입 admin
        const channelType = 'adminChannel';

        // 길드 인스턴스 생성
        const guildSettings = new GuildSettings(guild.id);

        // 길드 데이터 생성
        await guildSettings.loadOrCreate();

        // 관리자 채널 id 길드 데이터에 저장
        await guildSettings.saveChannelId(channelType, channel.id);

    } catch (error) {
        console.error('adminChannelCreate.js 에러 : ', error);
    };
};