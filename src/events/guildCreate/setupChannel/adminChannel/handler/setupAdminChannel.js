const GuildSettings = require('../../../../../services/GuildSettings');
const createAdminChannel = require('../modules/createAdminChannel');
const sendAdminMessage = require('../modules/sendAdminMessage');

module.exports = async (guild) => {
    try {
        // Wave 관리자 채널을 생성합니다.
        const channel = await createAdminChannel(guild);

        // 길드 인스턴스를 생성하고 Wave 관리자 채널 ID를 저장합니다.
        const guildSettings = new GuildSettings(guild.id);
        const guildData = await guildSettings.loadOrCreate()
        await guildSettings.saveChannelId('adminChannel', channel.id);

        // Wave 관리자 채널에 메세지를 보냅니다.
        await sendAdminMessage(channel, guildData);

    } catch (error) {
        console.error('setupAdminChannel.js 예외 : ', error);
    };
};