// adminChannelMessage.js

const GuildSettings = require('../../../services/GuildSettings');
const { adminMessage } = require('../module/adminMessage');

module.exports = async (guild) => {

    // 채널 타입
    const channelType = 'adminChannel';

    // 길드 인스턴스 생성 및 관리자 채널 Id 반환
    const guildSettings = new GuildSettings(guild.id);
    const adminChannelId = await guildSettings.loadChannelId(channelType);

    console.log('adminChannelMessage.js 의 adminChannelId : ', adminChannelId);

    try {
        // 관리자 채널 객체를 얻음
        const channel = await guild.channels.fetch(adminChannelId);

        // 메세지 전송
        const messageIds = await adminMessage(channel);

        // 삭제에 제외 될 id 리턴
        return messageIds;

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