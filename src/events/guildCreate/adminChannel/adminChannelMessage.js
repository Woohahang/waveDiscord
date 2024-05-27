// adminChannelMessage.js

const { adminMenuLoader } = require('./adminMenuLoader');
const { adminButton } = require('./adminButton');

const GuildSettings = require('../../../services/GuildSettings');

async function adminMessage(channel) {
    try {
        await channel.send({
            content: "## ⭐ Wave 관리자 채널",
            components: [adminMenuLoader(), adminButton()]
        });

        await channel.send({ content: '> * **채널 보기 권한 OFF 적용 상태 **\n> * **채널 보기 OFF** 를 유지해 주세요.' });
    } catch (error) {
        console.error('adminMessage 에러 : ', error);
    };
};

module.exports = async (guild) => {
    try {
        // 길드 인스턴스 생성
        const guildSettings = new GuildSettings(guild.id);

        const channelType = 'adminChannel';

        // 길드 설정을 불러오거나 생성
        await guildSettings.loadOrCreate();

        // 관리자 채널 ID를 불러옴
        const adminChannelId = await guildSettings.loadChannelId(channelType);

        // 관리자 채널 객체를 얻음
        const channel = await guild.channels.cache.get(adminChannelId);

        // 메세지 전송
        await adminMessage(channel);

    } catch (error) {
        console.error('adminChannelMessage.js 에러 : ', error);
    };
};