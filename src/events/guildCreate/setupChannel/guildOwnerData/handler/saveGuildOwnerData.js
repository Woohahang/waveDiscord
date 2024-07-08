const GuildSettings = require('../../../../../services/GuildSettings');
const getGuildOwnerData = require('../modules/getGuildOwnerData');

/**
 * 길드에 초대될 시 오너 정보를 저장합니다.
 * 
 * @param {Object} guild - 길드 객체
 */
module.exports = async (guild) => {
    try {
        // 길드 이름 및 오너 ID를 가져옵니다.
        const ownerData = getGuildOwnerData(guild);

        // 길드 이름 및 오너 ID를 저장합니다.
        const guildSettings = new GuildSettings(guild.id)
        await guildSettings.saveGuildOwnerData(ownerData);

        console.log(`길드 오너 데이터 저장 완료: ${ownerData.guildName} (Owner ID: ${ownerData.ownerId})`);
    } catch (error) {
        console.error('saveGuildOwnerData.js 예외 : ', error);
    };
};