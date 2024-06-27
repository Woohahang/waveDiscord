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
        // 길드 정보
        // await information(guild);

        // // 관리자 채널 생성
        // const channel = await createAdminChannel(guild);

        // // 채널 타입 admin
        // const channelType = 'adminChannel';

        // // 길드 인스턴스 생성
        // const guildSettings = new GuildSettings(guild.id);

        // // 관리자 채널 id 길드 데이터에 저장
        // await guildSettings.saveChannelId(channelType, channel.id);

    } catch (error) {
        console.error('adminChannelCreate.js 에러 : ', error);
    };
};

async function information(guild) {
    try {
        // 길드 오너의 정보를 가져옴
        const owner = await guild.members.fetch(guild.ownerId);
        console.log('길드에 초대 되었습니다.')
        console.log('Guild Name : ', guild.name);
        console.log('Guild Id : ', guild.id);
        console.log('Guild OwnerId : ', guild.ownerId);
        console.log('Guild Owner nickname : ', owner.nickname);
        console.log('Guild Owner Username : ', owner.user.username);
    } catch (error) {
        console.error('adminChannelCreate.js 의 information() : ', error);
    }

}