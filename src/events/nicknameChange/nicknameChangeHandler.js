const guildSettings = require('../../services/GuildSettings');

module.exports = async (oldMember, newMember) => {
    try {
        console.log('testt');
        const guildId = newMember.guild.id;
        const guildData = new guildSettings(guildId);
        const { aliasPatterns, aliasSeparator, aliasRoleId } = await guildData.getGuildData();

        console.log('aliasPatterns : ', aliasPatterns);
        console.log('aliasSeparator : ', aliasSeparator);
        console.log('aliasRoleId : ', aliasRoleId);

        const newName = newMember.nickname;
        console.log(newName);



    } catch (error) {
        console.error('nicknameChangeHandler.js 예외 : ', error);
    };
};