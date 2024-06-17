// mainChannelMessage.js

const GuildSettings = require('../../../services/GuildSettings');
const mainMessage = require('../module/mainMessage');

module.exports = async (guild) => {
    try {
        // 길드 인스턴스 생성 및 불러오기
        const guildSettings = new GuildSettings(guild.id);
        const guildData = await guildSettings.loadOrCreate();
        const { mainChannelId } = guildData;

        // 메인 채널 Id 객체 얻음
        const channel = await guild.channels.fetch(mainChannelId);

        // 메세지 전송
        const messageIds = await mainMessage(channel, guildData);

        return messageIds;
    } catch (error) {
        console.error('mainChannelMessage.js 에러 : ', error);
    };
};