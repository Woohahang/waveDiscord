// logUserInfo.js

// 유저 정보 로깅 함수
function logUserInfo(interaction) {
    try {
        const guildName = interaction.guild.name;
        const user = interaction.member.user;

        const userId = user.id;
        const username = user.username
        const globalName = user.globalName

        console.log(' ');
        console.log('예외 발생 유저 정보');
        console.log('guildName : ', guildName);
        console.log('userId : ', userId)
        console.log('username : ', username)
        console.log('globalName : ', globalName)
    } catch (error) {
        console.error('logUserInfo.js 에러 : ', error);
    };
};

module.exports = logUserInfo;