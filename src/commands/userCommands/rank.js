const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const logger = require('@utils/logger');
const fetchMemberDisplayNames = require('@utils/fetchMemberDisplayNames');
const userRepository = require('@repositories/userRepository');
const { TIER_ORDER, RANK_ORDER } = require('@constants/lolTier');
const RANK_ROMAN = require('@constants/rankRoman');
const getLoLTierEmoji = require('@constants/lolTierEmoji');

/**
 * 주어진 롤 티어 정보를 점수화하여 반환합니다.
 * 높은 티어일수록 높은 점수를 갖습니다.
 *
 * @param {Object} entry - 티어 정보 객체
 * @param {string} entry.tier - 티어 (예: "GOLD", "PLATINUM" 등)
 * @param {string} entry.rank - 랭크 (예: "I", "II", "III", "IV")
 * @param {number} [entry.leaguePoints] - 리그 포인트 (LP)
 * @returns {number} 계산된 티어 점수 (비교용). 티어/랭크가 없으면 -1 반환
 */
function getTierScore(entry) {
    const tier = entry.tier?.toUpperCase();
    const rank = entry.rank?.toUpperCase();

    const tierIndex = TIER_ORDER.indexOf(tier);
    const rankIndex = RANK_ORDER.indexOf(rank);

    if (tierIndex === -1 || rankIndex === -1) return -1;

    const tierScore = (TIER_ORDER.length - tierIndex) * 10000;
    const rankScore = (RANK_ORDER.length - rankIndex) * 100;

    return tierScore + rankScore + (entry.leaguePoints ?? 0);
}

/**
 * 유저 리스트에서 가장 높은 티어를 가진 항목을 추출하여 정리합니다.
 * 
 * @param {Array<Object>} lolTierUsers  - DB에서 가져온 유저 설정 목록
 * @param {Map<string, string>} memberMap - userId와 displayName의 매핑
 * @returns {Array<Object>} 유저별 가장 높은 티어 정보 배열
 */
function getTopTierUsers(lolTierUsers, memberMap) {
    return lolTierUsers.map(user => {

        const validEntries = user.leagueOfLegends.filter(e => e.tier);
        if (validEntries.length === 0) return null;

        const bestEntry = validEntries.reduce((prev, curr) =>
            getTierScore(curr) > getTierScore(prev) ? curr : prev
        );

        return {
            displayName: memberMap.get(user.userId),
            userId: user.userId,
            summonerName: bestEntry.summonerName,
            tier: bestEntry.tier.toUpperCase(),
            rank: bestEntry.rank,
            leaguePoints: bestEntry.leaguePoints,
            score: getTierScore(bestEntry),
        };
    }).filter(Boolean);
}

/**
 * 유저들을 티어 기준으로 그룹화합니다.
 *
 * 예: {
 *   "MASTER": [user1, user2],
 *   "DIAMOND": [user3],
 *   ...
 * }
 *
 * @param {Array<Object>} users - 유저 객체 배열
 * @returns {Object} 티어별로 그룹화된 유저 객체 (key: 티어)
 */
function groupUsersByTier(users) {
    const grouped = {};

    users.forEach(user => {
        // 해당 티어 키가 없으면 빈 배열 생성
        if (!grouped[user.tier]) grouped[user.tier] = [];

        // 티어 배열에 유저 추가
        grouped[user.tier].push(user);
    })

    return grouped;
}

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
        const userListText = users[tier].map(user => `${RANK_ROMAN[user.rank]} ${user.summonerName} ⦁ ${user.displayName}`).join('\n');

        return { name: tierDisplayName, value: userListText };
    });
}

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

module.exports = {
    data: new SlashCommandBuilder()
        .setName('랭킹')
        .setDescription('서버 멤버들의 리그 오브 레전드 티어 랭킹을 확인합니다.'),

    async execute(interaction) {
        const guild = interaction.guild;

        try {
            // 길드 멤버들의 ID와 닉네임 매핑 가져오기
            const memberMap = await fetchMemberDisplayNames(guild.members);
            const memberIds = [...memberMap.keys()];

            // 롤 티어 정보를 가진 유저 데이터 조회
            const lolTierUsers = await userRepository.findUsersWithLoLTierByIds(memberIds);

            // 각 유저의 최고 티어 정보 추출 및 정렬
            const topTierUsers = getTopTierUsers(lolTierUsers, memberMap);
            topTierUsers.sort((a, b) => b.score - a.score);

            // 티어별 그룹화 및 임베드 생성
            const grouped = groupUsersByTier(topTierUsers);
            const fields = buildRankingFields(grouped);
            const embed = buildEmbed(guild, fields);

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            logger.error('[rank] 랭킹 커맨드 실행 오류', {
                guildName: guild.name,
                userTag: interaction.user.tag,
                stack: error.stack,
            })
        };
    }
};