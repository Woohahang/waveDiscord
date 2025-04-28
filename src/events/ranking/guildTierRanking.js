const UserSettings = require('../../services/UserSettings');
const fetchMemberDisplayNames = require('./modules/fetchMemberDisplayNames');
const getHighestTierUsers = require('./modules/getHighestTierUsers');
const groupUsersByTier = require('./modules/groupUsersByTier');
const buildTierDescription = require('./modules/buildTierDescription');

/**
 * 길드 멤버들의 롤 티어 랭킹을 조회하고, 정리하여 메시지로 응답합니다.
 *
 * @param {CommandInteraction} interaction - 디스코드 상호작용 객체
 */
module.exports = async (interaction) => {
    try {
        // 길드 정보 가져오기
        const guild = interaction.guild;

        // 길드 멤버들의 ID와 닉네임 매핑 가져오기
        const memberMap = await fetchMemberDisplayNames(guild);
        const memberIds = [...memberMap.keys()];

        // 롤 티어 정보를 가지고 있는 유저 데이터 조회
        const guildUserDatas = await UserSettings.findUsersWithLoLTierByIds(memberIds);

        // 각 유저마다 가장 높은 티어 정보만 추출 및 높은 순서대로 정렬
        const highestTierUsers = getHighestTierUsers(guildUserDatas, memberMap);
        highestTierUsers.sort((a, b) => b.score - a.score);

        // 티어별로 유저들을 그룹화
        const grouped = groupUsersByTier(highestTierUsers);

        // 티어 그룹을 보기 좋게 문자열로 구성
        const description = buildTierDescription(grouped, guild.name);

        // 디스코드 채팅에 응답
        await interaction.reply({ content: description });

    } catch (error) {
        console.error('[guildTierRanking] 길드 롤 티어 랭킹을 조회하고 채팅에 응답하는 과정에 오류 발생:', error);
    }
};