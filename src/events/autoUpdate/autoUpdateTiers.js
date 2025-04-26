const UserSettings = require('../../services/UserSettings');
const fetchLeagueTier = require('../../shared/api/fetchLeagueOfLegendsTier');
const updateUserLoLTier = require('./updateUserLoLTier');


/**
 * 티어 자동 업데이트
 * 오래된 순서대로 3명의 롤 티어를 업데이트합니다.
 */
module.exports = async () => {
    try {
        // 티어 정보 업데이트가 필요한 유저를
        const users = await UserSettings.getUsersForLoLTierUpdate();

        for (const user of users) {
            await updateUserLoLTier(user);
        }
    } catch (error) {
        console.error('[autoUpdateTiers] 자동 업데이트 중 오류 발생:', error);
    }
};