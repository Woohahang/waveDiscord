// voiceJoinEmbed.js

const GuildSettings = require('../../../services/GuildSettings');
const UserSettings = require('../../../services/UserSettings');

const voiceDeleteEmbed = require('./voiceDeleteEmbed');
const customEmbed = require('../modules/customEmbed');

/* 채널 입장 임베드 전송, 이전 중복 메시지 삭제 */
module.exports = async (oldState, newState) => {

    const memberId = newState.member.id;
    const guildId = newState.guild.id;
    const channel = newState.channel;

    try {
        // 이전 채널 메세지 삭제
        if (oldState) {
            await voiceDeleteEmbed(oldState);
        };

        // 유저 인스턴스 생성 -> 유저 데이터 불러오기
        const userStettings = new UserSettings(memberId);
        const nickNames = await userStettings.load();
        if (!nickNames) return;

        // 길드 인스턴스 생성 -> 길드 데이터 불러오기
        const guildSettings = new GuildSettings(guildId);
        const guildData = await guildSettings.loadOrCreate();

        // 임베드 커스텀
        const embed = await customEmbed(newState, nickNames, guildData);
        if (!embed) return;

        // 임베드 전송
        await channel.send({
            embeds: [embed],
        });

    } catch (error) {
        console.error('voiceJoinEmbed.js 에러 : ', error);
    };
};