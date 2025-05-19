const GuildSettings = require('../../../services/GuildSettings');
const logger = require('@utils/logger');

/**
 * 길드에 초대될 시 오너 정보를 저장합니다.
 * 
 * @param {Object} guild - 길드 객체
 */
module.exports = async (guild) => {
    try {
        const owner = await guild.fetchOwner();

        const ownerData = {
            guildName: guild.name,
            ownerId: guild.ownerId,
            ownerUsername: owner.user.username
        }

        // 길드 이름 및 오너 ID를 저장합니다.
        const guildSettings = new GuildSettings(guild.id)
        await guildSettings.updateBasicInfo(ownerData);

    } catch (error) {
        logger.error('[saveBasicGuildInfo] 오너 정보 저장 중 오류', {
            guildId: guild.id,
            stack: error.stack
        })

        throw error;
    };
};