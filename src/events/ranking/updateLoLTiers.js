const UserSettings = require('../../services/UserSettings');
const fetchLeagueTier = require('../../shared/api/fetchLeagueOfLegendsTier');

/**
 * 오래된 순서대로 3명의 롤 티어를 업데이트합니다.
 */
module.exports = async function updateLoLTiersJob() {
    const users = await UserSettings.getUsersForLoLTierUpdate();

    for (const user of users) {
        let updated = false;

        console.log('user :', user);

        // 유저의 롤 닉네임 중 랭크 정보가 있는 것만 업데이트
        for (let entry of user.leagueOfLegends) {
            console.log('entry :', entry);

            const latestTier = await fetchLeagueTier(entry.summonerName);
            if (!latestTier) continue;

            console.log('latestTier :', latestTier);


            // 기존 정보와 비교해 변경되었을 때만 업데이트
            if (
                entry.tier !== latestTier.tier ||
                entry.rank !== latestTier.rank ||
                entry.leaguePoints !== latestTier.leaguePoints
            ) {
                entry.tier = latestTier.tier;
                entry.rank = latestTier.rank;
                entry.leaguePoints = latestTier.leaguePoints;
                updated = true;
            }
        }

        if (updated) {
            await user.save(); // user는 mongoose doc이므로 save() 사용 가능
            console.log(`✅ [${user.userId}] 롤 티어 정보 업데이트 완료`);
        } else {
            console.log(`➖ [${user.userId}] 변경된 티어 정보 없음`);
        }
    }

};