const { EmbedBuilder } = require('discord.js');
const getGameLogoEmoji = require("@constants/gameLogoEmoji");
const GAME_TYPES = require("@constants/gameTypes");
const platformNames = require("@constants/platformNames");
const platforms = require("@constants/platforms");
const getGamesLink = require("@modules/voiceActivity/utiles/getGamesLink");
const getDisplayName = require('@utils/discord/getDisplayName');
const WAVE_ICON_URL = require('@constants/waveIcon');
const logger = require('@utils/logger');

/**
 * gameType이 속한 플랫폼 key를 반환합니다.
 *
 * @param {string} gameType
 * @returns {string|null}
 */
function getPlatformNameByGameType(gameType) {
    for (const [platformName, gameTypes] of Object.entries(platforms)) {
        if (gameTypes.includes(gameType))
            return platformName;
    }

    return null;
}


/**
 * gameType과 entry를 바탕으로 표시 문자열을 만듭니다.
 *
 * @param {string} gameType
 * @param {Object} entry
 * @returns {string}
 */
function formatNicknameLine(gameType, entry) {
    const emoji = getGameLogoEmoji(gameType);
    const nickname = entry.nickname;

    switch (gameType) {
        case GAME_TYPES.STEAM:
            return `${emoji} [${nickname}](${entry.profileLink})`;

        case GAME_TYPES.LEAGUE_OF_LEGENDS:
            return `${emoji} [${nickname}](${getGamesLink(gameType, nickname)})`;

        case GAME_TYPES.BLIZZARD:
        case GAME_TYPES.OVERWATCH_2:
            return `${emoji} ${nickname}`;

        default:
            return `${emoji} [${nickname}](${getGamesLink(gameType, nickname)})`;
    }

}


function buildUserInfoEmbedField({ profiles }) {

    const platformFieldsMap = {};

    for (const { gameType, entries } of profiles) {
        const platformKey = getPlatformNameByGameType(gameType);

        if (!platformKey)
            continue;

        if (!platformFieldsMap[platformKey])
            platformFieldsMap[platformKey] = [];

        for (const entry of entries) {
            platformFieldsMap[platformKey].push(
                formatNicknameLine(gameType, entry)
            );
        }
    }

    return Object.entries(platformFieldsMap).map(([platformKey, lines]) => ({
        name: `** ${platformNames[platformKey]} **`,
        value: lines.join('\n')
    }));

}

function buildUserInfoEmbed(member, fields) {
    // 유저의 서버 별명이 없다면 글로벌 이름을 사용합니다
    const displayName = getDisplayName(member);

    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setAuthor({ name: displayName, iconURL: member.user.displayAvatarURL(), url: member.user.avatarURL() })
        .addFields(fields)
        .setFooter({ text: '―――――――― update', iconURL: WAVE_ICON_URL });

}

module.exports = async function handleVoiceJoin({ newState, dependencies }) {
    const member = newState.member;
    const guild = newState.guild;
    const channel = newState.channel;

    try {
        const result = await dependencies.sendVoiceProfileMessageUseCase
            .execute({
                userId: member.id,
                guildId: guild.id
            });

        if (!result?.data)
            return;

        const fields = buildUserInfoEmbedField(result.data)
        const embed = buildUserInfoEmbed(member, fields);

        // 임베드를 전송합니다.
        const sentMessage = await channel.send({ embeds: [embed] });

        await dependencies.saveVoiceMessageUseCase
            .execute({
                guildId: guild.id,
                userId: member.id,
                channelId: sentMessage.channelId,
                messageId: sentMessage.id,
            });
    } catch (error) {
        logger.error('[handleVoiceJoin] error', error);
    }

}