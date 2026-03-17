const logger = require('@utils/logger');

/**
 * Discord 길드 객체에서 길드 기본 정보를 추출하여 저장 유스케이스를 실행합니다.
 *
 * @param {import('discord.js').Guild} guild
 * @param {Object} dependencies
 * @param {import('@application/guild/useCases/syncGuildInfoUseCase')} dependencies.syncGuildInfoUseCase
 */
module.exports = async function syncGuildBasicInfo(guild, dependencies) {
    try {
        const owner = await guild.fetchOwner();

        await dependencies.syncGuildInfoUseCase.execute({
            guildId: guild.id,
            guildName: guild.name,
            ownerId: guild.ownerId,
            ownerUsername: owner.user.username,
        });

    } catch (error) {
        logger.error('[syncGuildBasicInfo] 길드 기본 정보 저장 중 오류', {
            guildId: guild.id,
            stack: error.stack,
        });

        throw error;
    }
};