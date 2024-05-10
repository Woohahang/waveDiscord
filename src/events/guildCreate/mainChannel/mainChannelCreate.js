const guildSettingsSchema = require('../../../mongoDB/guildSettingsSchema');

async function mainChannelCreate(guild) {
    try {
        // 길드 초대시 채팅 채널 생성
        const channel = await guild.channels.create({ name: '📘ㆍwave', type: 0 });

        // 채팅 채널 : 메시지 보내기 off
        channel.permissionOverwrites.create(channel.guild.roles.everyone, { SendMessages: false });

        // 채널 ID만 저장
        const channelId = channel.id;

        // 길드 설정 데이터 찾기 또는 새로 생성
        let guildSettingsData = await guildSettingsSchema.findOne({ guildId: guild.id });
        if (!guildSettingsData) {
            // 찾는 데이터가 없으면 새로 생성
            guildSettingsData = new guildSettingsSchema({
                guildId: guild.id,
                mainChannelId: channelId
            });
        } else {
            // 찾은 데이터가 있으면 채널 ID만 업데이트
            guildSettingsData.mainChannelId = channelId;
        }
        await guildSettingsData.save();

    } catch (error) {
        console.error(error);
    };
};

module.exports = { mainChannelCreate };