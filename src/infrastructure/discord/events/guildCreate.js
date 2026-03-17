const { Events, PermissionsBitField } = require('discord.js');
const logger = require('@utils/logger');
const guildCreateHandler = require('../handlers/guildCreateHandler');

/**
 * 해당 길드에서 봇이 관리자 권한을 가지고 있는지 확인합니다.
 * 
 * @param {Guild} guild Discord Guild 객체
 * @returns {boolean} 관리자 권한 여부
 */
function isBotAdmin(guild) {
    const botMember = guild.members.me;
    return botMember?.permissions.has(PermissionsBitField.Flags.Administrator) ?? false;
}

module.exports = function guildCreate(client, dependencies) {

    client.on(Events.GuildCreate, async guild => {
        try {
            if (!isBotAdmin(guild))
                return logger.warn('[guildCreate] 봇 관리자 권한 없음', { guildId: guild.id });

            await guildCreateHandler(guild, dependencies);

        } catch (error) {
            logger.error('[guildCreate] 서버 추가 처리 중 오류', {
                guildId: guild.id,
                guildName: guild.name,
                stack: error.stack
            });
        }
    });

};