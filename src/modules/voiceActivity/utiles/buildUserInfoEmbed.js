const { EmbedBuilder } = require('discord.js');
const getDisplayName = require('@utils/discord/getDisplayName');
const WAVE_ICON_URL = require('@constants/waveIcon');

/**
 * 유저 데이터를 바탕으로 Discord Embed를 생성합니다.
 * 
 * @param {GuildMember} member - Discord 서버 멤버 객체
 * @param {Array<Object>} fields - 임베드에 추가할 필드 정보 배열
 * @param {Date} updatedAt - 유저 데이터의 마지막 업데이트 시간
 * @returns {EmbedBuilder} Discord Embed 객체
 */
function buildUserInfoEmbed(member, fields, updatedAt) {
    try {
        // 유저의 서버 별명이 없다면 글로벌 이름을 사용합니다
        const displayName = getDisplayName(member);

        return new EmbedBuilder()
            .setColor(0x0099FF)
            .setAuthor({ name: displayName, iconURL: member.user.displayAvatarURL(), url: member.user.avatarURL() })
            .addFields(fields)
            .setTimestamp(updatedAt)
            .setFooter({ text: '―――――――― update', iconURL: WAVE_ICON_URL });

    } catch (error) {
        console.error('[userInfoEmbed] 유저 Embed 생성 중 예외 발생:', {
            memberId: member.id,
            username: member.user.username,
            updatedAt,
            error
        });
    };
};

module.exports = buildUserInfoEmbed;