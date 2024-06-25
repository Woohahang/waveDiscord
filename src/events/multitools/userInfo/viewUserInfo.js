const UserSettings = require('../../../services/UserSettings');
const { EmbedBuilder } = require('discord.js');
const generateGameFields = require('./module/generateGameFields');
const { alreadyDeleted } = require('./module/resultMessage');
const test = require('./module/test');

// 사용자 데이터를 바탕으로 Discord 임베드를 생성하는 함수
function userInfoEmbed(userData, member) {
    try {
        // 서버 별명 없으면 글로벌 이름 사용
        const displayName = member.nickname ? member.nickname : member.user.globalName;

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setAuthor({ name: displayName, iconURL: member.user.displayAvatarURL(), url: member.user.avatarURL() })
            .addFields(generateGameFields(userData)) // 유저 데이터를 바탕으로 필드 생성
            .setTimestamp(new Date(userData.updatedAt)) // 마지막 업데이트 시간 설정
            .setFooter({ text: '―――――――― update', iconURL: 'https://drive.google.com/uc?export=view&id=19W-rsIvrkFJSJcZ7-PHXOfZcPRO1HYTi' });

        return embed;
    } catch (error) {
        console.error('userInfoEmbed 함수 예외 : ', error);
        throw error;
    };
};

module.exports = async (interaction) => {
    try {

        // test(interaction);

        const member = interaction.member;

        // 유저 인스턴스 생성 및 유저 데이터 불러오기
        const userSettings = new UserSettings(member.id);
        const userData = await userSettings.loadUserData();

        // 유저 데이터가 없는 경우 처리
        if (!userData) {
            await interaction.update({ content: alreadyDeleted, components: [], ephemeral: true });
            return;
        };

        // 유저 데이터를 바탕으로 임베드 생성
        const embed = userInfoEmbed(userData, member);

        // 생성된 임베드로 응답.
        await interaction.update({ embeds: [embed], components: [], ephemeral: true });

    } catch (error) {
        console.error('viewUserInfo.js 예외 : ', error);
    };
};