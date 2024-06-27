const GuildSettings = require('../../../services/GuildSettings');
const { adminMenuLoader } = require('../module/adminMenuLoader');
const { adminButton } = require('../module/adminButton');

const serverSettingsMessage = (guildAlias) =>
    '## :gear: 서버 설정\n' +
    '> ### :label: ' + guildAlias + '\n';

module.exports = async (guild) => {
    try {
        // 길드 인스턴스 생성 및 관리자 채널 Id를 가지고 옵니다.
        // const guildSettings = new GuildSettings(guild.id);
        // const guildData = await guildSettings.loadOrCreate();

        // // 길드 채널 중에 Wave 관리자 채널 객체를 찾습니다..
        // const channel = await guild.channels.fetch(guildData.adminChannelId);

        // // Wave 관리자 채널에 메세지를 전송합니다.
        // const message1 = await channel.send({
        //     content: '# ⭐ Wave 관리자 채널',
        //     components: [adminMenuLoader(), adminButton()],
        // });

        // // Wave 관리자 채널에 메세지를 전송합니다.
        // const message2 = await channel.send({
        //     content: serverSettingsMessage('test')
        // });

        // // 업데이트 상호작용을 위해 id를 반환합니다.
        // return [message1.id, message2.id];

    } catch (error) {
        console.error('adminChannelMessage.js 에러 : ', error);
    };
};

/*
비동기 작업 : await guild.channels.fetch(adminChannelId);

동기 작업 : guild.channels.cache.get(adminChannelId);

즉, 현재 코드에서 채널을 가지고 올 때

빠르지만 불안정한(봇이 막 시작 되었거나, 채널이 방금 생성 되었을 경우 캐시되지 않아 예외 발생) 캐시를 사용하는 것 보다,

discord api 요청인 패치() 를 사용하여 항상 최신 상태의 정보를 제공 받는게 맞다.
*/