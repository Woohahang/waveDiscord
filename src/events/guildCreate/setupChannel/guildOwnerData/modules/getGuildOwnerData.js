// 길드로부터 오너 ID와 서버 이름을 가져옵니다.
function getGuildOwnerData(guild) {
    const ownerId = guild.ownerId;
    const guildName = guild.name;

    return { guildName, ownerId };
};

module.exports = getGuildOwnerData;