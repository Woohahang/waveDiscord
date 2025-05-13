const GuildSettings = require('../../services/GuildSettings');
const logger = require('@utils/logger');

/**
 * 길드에 초대될 시 오너 정보를 저장합니다.
 * 
 * @param {Object} guild - 길드 객체
 */
module.exports = async (guild) => {

    const ownerData = {
        ownerId: guild.ownerId,
        guildName: guild.name
    }

    try {
        // 길드 이름 및 오너 ID를 저장합니다.
        const guildSettings = new GuildSettings(guild.id)
        await guildSettings.updateBasicInfo(ownerData);

    } catch (error) {
        logger.error('[saveBasicGuildInfo] 오너 정보 저장 중 오류', {
            guildId: guild.id,
            ownerData,
            stack: error.stack
        })
    };
};