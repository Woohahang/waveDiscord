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

        // 길드 DB 셋팅
        const guildSettings = new GuildSettings(guild.id);
        await guildSettings.loadOrCreate();

        const adminChannelId = channel.id;

        // admin 채널 id, DB 저장
        await guildSettings.updateAdminChannelId(adminChannelId);

    } catch (error) {
        console.error('adminChannelCreate.js 에러 : ', error);
    };
};