// updateChannels.js

const GuildSettings = require('../../../services/GuildSettings');

const adminChannelUpDate = require('../module/adminChannelUpDate');
const mainChannelUpdate = require('../module/mainChannelUpdate');

// const updateCompleted =
//     '\n' + '## 업데이트 완료' +
//     '\n' + '> * 현재 **Wave** 는 보완과 개발 단계에 있습니다. ' +
//     '\n' + '> * 개발은 지금도 진행 중이며 가끔 업데이트 버튼을 눌러주세요.';

/* 목적, Wave 채널 업데이트 */
module.exports = async (interaction) => {

    // 길드 인스턴스 생성
    const guildSettings = new GuildSettings(interaction.guild.id);

    try {
        // 관리자 채널, 메인 채널 업데이트 : 병렬 처리를 위해 Promise.all 
        await Promise.all([
            adminChannelUpDate(interaction, guildSettings),
            mainChannelUpdate(interaction, guildSettings)
        ]);

    } catch (error) {
        console.error('serverUpDate.js 에러 : ', error)
        interaction.reply({ content: '에러가 발생했습니다. 나중에 다시 시도해주세요.', ephemeral: true })
    };
};



/*
목적 : 채널 객체 얻기

비동기 작업 : await guild.channels.fetch(adminChannelId);
특징 : discord api를 통해 최신 정보를 받을 수 있다.

동기 작업 : guild.channels.cache.get(adminChannelId);
특징 : 캐시 된 데이터를 빠르게 조회 한다.

동기 작업 : interaction.guild.channels.resolve(adminChannelId);
특징 : 캐시 된 데이터를 빠르게 조회 한다. 조금 더 유연하게 조회할 수 있다. 채널의 이름이나 컨텐트 등


결론 현재 코드는 채널 객체를 가지고 올 때 반드시 정확하게 가지고 와야한다. 느려도 된다.

빠르지만 불안정한(봇이 막 시작 되었거나, 채널이 방금 생성 되었을 경우 캐시되지 않아 예외 발생) 캐시를 사용하는 것 보다,

discord api 요청인 패치() 를 사용하여 항상 최신 상태의 정보를 제공 받는게 맞다.
*/