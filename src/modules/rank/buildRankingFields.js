const { TIER_ORDER } = require("@constants/lolTier");
const getLoLTierEmoji = require("@constants/lolTierEmoji");
const RANK_ROMAN = require("@constants/rankRoman");

/**
 * 그룹화된 유저 데이터를 Discord 임베드 필드로 변환합니다.
 *
 * @param {Object} grouped - 티어별 그룹화된 유저 객체
 * @returns {Array<Object>} Discord Embed에 사용될 필드 배열
 */
function buildRankingFields(users) {

    const availableTiers = TIER_ORDER.filter(tier => users[tier]);

    return availableTiers.map(tier => {
        const tierDisplayName = `${getLoLTierEmoji(tier)}  ${tier[0] + tier.slice(1).toLowerCase()}`
        const userListText = users[tier].map(user => `${RANK_ROMAN[user.rank]} ${user.nickname} ⦁ ${user.displayName}`).join('\n');

        return { name: tierDisplayName, value: userListText };
    });
}

module.exports = buildRankingFields;