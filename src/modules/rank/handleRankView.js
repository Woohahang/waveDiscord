const fetchMemberDisplayNames = require("@utils/fetchMemberDisplayNames");
const logger = require("@utils/logger");
const getGameTierUsers = require("./getGameTierUsers");
const groupUsersByTier = require("./groupUsersByTier");
const buildRankingFields = require("./buildRankingFields");
const buildEmbed = require("./buildEmbed");
const mapUsersToTopTier = require("./mapUsersToTopTier");

module.exports = async (interaction) => {
    const guild = interaction.guild;
    const [gameType] = interaction.values;

    try {
        // 길드 멤버들의 ID와 닉네임 매핑 가져오기
        const memberMap = await fetchMemberDisplayNames(guild.members);

        // memberMap의 key(userId)들을 배열로 추출
        const memberIds = [...memberMap.keys()];

        // 티어 정보가 있는 유저 목록 조회
        const users = await getGameTierUsers(gameType, memberIds);

        // 유저별로 가장 높은 티어 항목만 추출하여 배열 생성
        const topTierUsers = mapUsersToTopTier(users, gameType, memberMap);

        // 티어 점수를 기준으로 내림차순 정렬 (높은 점수 우선)
        topTierUsers.sort((a, b) => b.score - a.score);

        // 티어별 그룹화 및 임베드 생성
        const grouped = groupUsersByTier(topTierUsers);
        const fields = buildRankingFields(grouped);
        const embed = buildEmbed(guild, fields);

        await interaction.reply({ embeds: [embed] });

    } catch (error) {
        logger.error('[handleRankView] 유저 티어 조회 또는 랭킹 임베드 생성 실패', {
            guildId: guild.id,
            gameType,
            stack: error.stack
        })
    }
}