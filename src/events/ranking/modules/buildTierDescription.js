const { getLoLTierEmoji } = require('@constants/lolTierEmoji');
const { TIER_ORDER } = require('@constants/lolTier');
const RANK_ROMAN = require('@constants/rankRoman');

/**
 * 티어 그룹을 바탕으로 description 문자열을 만듭니다.
 */
function buildTierDescription(grouped, guildName) {
    let description = `## ${getLoLTierEmoji('CLASH')} ${guildName}\n`;

    for (const tier of TIER_ORDER) {
        if (!grouped[tier]) continue;

        description += `## ${getLoLTierEmoji(tier)} ${tier[0] + tier.slice(1).toLowerCase()}\n`;

        grouped[tier].forEach(user => {
            description += `**${RANK_ROMAN[user.rank]}** ${user.summonerName} ⦁ ${user.displayName}\n`;
        });
    }
    return description;
}

module.exports = buildTierDescription;