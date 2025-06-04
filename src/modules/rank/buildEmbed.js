const { EmbedBuilder } = require('discord.js');

/**
 * Discord 임베드 객체를 생성합니다.
 *
 * @param {Guild} guild - Discord 서버 객체
 * @param {Array<Object>} fields - Embed에 들어갈 필드 배열
 * @returns {EmbedBuilder} 생성된 Embed 객체
 */
function buildEmbed(guild, fields) {

    const guildName = guild.name;
    const guildIconURL = guild.iconURL({ dynamic: true });

    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setAuthor({ name: guildName, iconURL: guildIconURL })
        .addFields(fields)
}

module.exports = buildEmbed;