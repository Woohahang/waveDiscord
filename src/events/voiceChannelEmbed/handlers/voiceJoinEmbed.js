// voiceJoinEmbed.js

const GuildSettings = require('../../../services/GuildSettings');
const UserSettings = require('../../../services/UserSettings');
const userStatusEmbed = require('../modules/userStatusEmbed');

/* 채널 입장 임베드 전송, 이전 중복 메시지 삭제 */
module.exports = async (newState) => {

    const memberId = newState.member.id;
    const guildId = newState.guild.id;
    const channel = newState.channel;
    if (!channel) return;

    try {
        // 유저 인스턴스 생성 -> 유저 데이터 불러오기
        const userStettings = new UserSettings(memberId);
        const nickNames = await userStettings.load();
        if (!nickNames) return;

        // 길드 인스턴스 생성 -> 길드 데이터 불러오기
        const guildSettings = new GuildSettings(guildId);
        const guildData = await guildSettings.loadOrCreate();

        // 임베드
        const embed = await userStatusEmbed(newState, nickNames, guildData);
        if (!embed) return;

        // 임베드 전송
        await channel.send({ embeds: [embed] });

    } catch (error) {
        if (error.code === 10008 || error.code === 10003) return; //10008 === Unknown Message, 10003 === Unknown Channel 
        console.error('voiceJoinEmbed.js 에러 : ', error);
    };
};

/*
[ error.code 10003 ] Unknown Channel 리턴 이유:
유저가 음성 채널에 입장한 상태에서 채널이 삭제되었을 경우, 
Discord API는 Unknown Channel (에러 코드 10003)을 반환합니다.
이러한 경우, 채널이 존재하지 않기 때문에 메시지를 전송할 수 없습니다.
따라서 이 예외를 무시하고, 추가적인 처리를 하지 않습니다.
*/