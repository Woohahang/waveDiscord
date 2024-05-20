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
        // GuildSettings 인스턴스 생성
        let guildSettings = new GuildSettings(guild.id);

        // 길드 설정을 불러오거나 생성
        await guildSettings.loadOrCreate();

        // 관리자 채널 ID를 불러옴
        const adminChannelId = await guildSettings.loadAdminChannelId();

        // 관리자 채널 객체를 얻음
        const channel = guild.channels.cache.get(adminChannelId);

        if (channel) {
            // 메시지 전송
            await adminMessage(channel);
        } else {
            console.log('채널이 존재하지 않습니다. 나중에 처리하기');
            // 이거 여기에 관리자에게 직접 1:1 DM 보내면 되겠다.
            // 알 수 없는 에러로 관리자 채널의 데이터를 날렸다고
            //  번거롭지만 추방 이후 다시 초대해달라고
        };

    } catch (error) {
        console.error('adminChannelMessage.js 에러 : ', error);
    };
};