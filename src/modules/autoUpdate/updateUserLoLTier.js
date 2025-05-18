const fetchLeagueTier = require('@shared/api/fetchLeagueOfLegendsTier');
const logger = require('@utils/logger');

/**
 * 기존 티어 정보와 새로운 티어 정보를 비교합니다.
 *
 * @param {Object} oldEntry - 기존 티어 정보
 * @param {Object} newEntry - 새로운 티어 정보
 * @returns {boolean} - 변경 여부
 */
const isTierDifferent = (oldEntry, newEntry) => {
    return (
        oldEntry.tier !== newEntry.tier ||
        oldEntry.rank !== newEntry.rank ||
        oldEntry.leaguePoints !== newEntry.leaguePoints
    );
}

/**
 * 개별 유저의 롤 티어 정보를 최신화합니다.
 *
 * @param {Object} user - Mongoose 유저 문서
 */
async function updateUserLoLTier(user) {
    try {
        // 유저의 롤 닉네임 배열을 순회하며 각 소환사 정보를 업데이트
        for (let entry of user.leagueOfLegends) {

            const latestTier = await fetchLeagueTier(entry.summonerName); // 소환사명을 기반으로 최신 티어 정보 조회
            if (!latestTier) continue; // 최신 정보를 가져오지 못하면 스킵

            // 기존 저장된 정보와 최신 정보를 비교해 변경사항이 있을 경우
            if (isTierDifferent(entry, latestTier)) {
                // 티어, 랭크, 리그포인트를 최신 정보로 덮어쓰기
                entry.tier = latestTier.tier;
                entry.rank = latestTier.rank;
                entry.leaguePoints = latestTier.leaguePoints;
            }
        }

        // 변경사항이 없더라도 updatedAt 갱신을 위해 save 사용
        await user.save();

    } catch (error) {
        logger.error('[updateUserLoLTier] 유저 티어 정보 업데이트 중 오류 발생', {
            userId: user?.userId,
            stack: error.stack
        });
    }
}

module.exports = updateUserLoLTier;