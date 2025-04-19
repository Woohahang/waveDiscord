const GuildSettings = require('../../../services/GuildSettings');
const UserSettings = require('../../../services/UserSettings');
const buildUserInfoEmbed = require('../../../shared/embed/buildUserInfoEmbed')
const buildUserAndGuildFields = require('../../../shared/embed/buildUserAndGuildFields');
const logUserInfo = require('../../../utils/log/logUserInfo');

/**
 * 사용자가 음성 채널에 참여할 때 호출되는 주요 함수입니다.
 * 
 * 이 함수는 사용자의 닉네임을 임베드 형식으로 텍스트 채널에 전송합니다.
 */
module.exports = async (newState) => {
    try {
        const member = newState.member;
        const guild = newState.guild;
        const channel = newState.channel;

        // 유저 인스턴스 생성 및 유저 데이터를 불러옵니다.
        const userStettings = new UserSettings(member.id);
        const userData = await userStettings.loadUserData();
        if (!userData) return;

        // 길드 인스턴스 생성 및 길드 데이터를 불러옵니다.
        const guildSettings = new GuildSettings(guild.id);
        const guildData = await guildSettings.loadOrCreate();

        // 임베드 필드 생성를 만듭니다.
        let fields = buildUserAndGuildFields(userData, guildData);
        if (!fields) return;

        // 마지막 업데이트 시간을 Date 객체로 변환합니다.
        const updatedAt = new Date(userData.updatedAt);

        // 임베드를 생성합니다.
        const embed = buildUserInfoEmbed(member, fields, updatedAt);

        // 임베드를 전송합니다.
        await channel.send({ embeds: [embed] });

    } catch (error) {
        // 10008 : Unknown Message,  10003 : Unknown Channel
        if (error.code === 10008 || error.code === 10003) return;
        console.error('음성 채널 참여 중 오류 발생 : ', error);
        logUserInfo(newState)
    };
};