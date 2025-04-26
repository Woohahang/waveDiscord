const fetchLeagueTier = require('../../../shared/api/fetchLeagueOfLegendsTier');

async function updateUserLoLTier(user) {
    try {
        let updated = false;

        // 유저의 롤 닉네임 중 랭크 정보가 있는 것만 업데이트
        for (let entry of user.leagueOfLegends) {

            console.log('userId:', user.userId);

            const latestTier = await fetchLeagueTier(entry.summonerName);
            if (!latestTier) continue;

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
            console.log(`✅ 롤 티어 정보 업데이트 완료`);
        } else {
            user.updatedAt = new Date();  // 업데이트 갱신 용도
            await user.save();
            console.log(`➖ 변경된 티어 정보 없음`);
        }
    } catch (error) {
        console.error('updateUserLoLTier',
            user.userId,
            error
        );

    }
}

module.exports = updateUserLoLTier;