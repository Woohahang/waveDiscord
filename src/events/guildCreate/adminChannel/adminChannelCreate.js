const guildSettingsSchema = require('../../../mongoDB/guildSettingsSchema');

async function adminChannelCreate(guild) {

    try {
        // 채널 생성 : 채팅 채널
        const channel = await guild.channels.create({ name: '📘ㆍwave 관리자', type: 0 });

        // 채널 설정 : 메시지 보내기 off
        channel.permissionOverwrites.create(channel.guild.roles.everyone, { ViewChannel: false, SendMessages: false });

        // 채널 Id -> DB에 저장
        const guildSettings = await guildSettingsSchema.findOne({ guildId: guild.id });

        if (guildSettings) {
            guildSettings.adminChannelId = channel.id;
            await guildSettings.save();
        } else {
            console.log('길드 id 를 찾을 수 없습니다 : adminChannelCreate.js')
        };

    } catch (error) {
        console.error(`관리자 채널 생성 중 에러 발생: ${error}`);
    };

};

module.exports = { adminChannelCreate };