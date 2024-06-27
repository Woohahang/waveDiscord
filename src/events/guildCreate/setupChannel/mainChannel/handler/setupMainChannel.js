const GuildSettings = require('../../../../../services/GuildSettings');
const createMainChannel = require('../modules/createMainChannel');
const sendMainMessage = require('../modules/sendMainMessage');

module.exports = async (guild) => {
    try {
        // Wave 메인 채널을 생성합니다.
        const channel = await createMainChannel(guild);

        // 길드 인스턴스 생성 및 채널 Id 저장
        const guildSettings = new GuildSettings(guild.id);
        const guildData = await guildSettings.loadOrCreate();
        await guildSettings.saveChannelId('mainChannel', channel.id);

        // Wave 메인 채널에 메세지를 보냅니다.
        await sendMainMessage(channel, guildData);

    } catch (error) {
        console.error('mainChannel.js 예외 : ', error);
    };
};