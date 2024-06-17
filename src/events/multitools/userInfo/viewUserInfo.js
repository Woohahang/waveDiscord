const UserSettings = require('../../../services/UserSettings');
const { EmbedBuilder } = require('discord.js');
const generateGameFields = require('./module/generateGameFields');

// 사용자 데이터를 바탕으로 Discord 임베드를 생성하는 함수
function userInfoEmbed(userData, member) {
    try {
        const displayName = member.nickname ? member.nickname : member.user.globalName;

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setAuthor({ name: displayName, iconURL: member.user.displayAvatarURL(), url: member.user.avatarURL() })
            .addFields(generateGameFields(userData))
            .setTimestamp(new Date(userData.updatedAt))
            .setFooter({ text: '―――――――― update', iconURL: 'https://drive.google.com/uc?export=view&id=19W-rsIvrkFJSJcZ7-PHXOfZcPRO1HYTi' });

        return embed;
    } catch (error) {
        console.error('userInfoEmbed 함수 예외 : ', error);
        throw error;
    };
};

module.exports = async (interaction) => {
    try {
        const member = interaction.member;

        // 유저 인스턴스 생성 및 불러오기
        const userSettings = new UserSettings(member.id);
        const userData = await userSettings.getUserData();

        // 사용자 데이터로 임베드 생성
        const embed = userInfoEmbed(userData, member);

        await interaction.update({ embeds: [embed], components: [], ephemeral: true });

    } catch (error) {
        console.error('viewUserInfo.js 예외 : ', error);
    };
};