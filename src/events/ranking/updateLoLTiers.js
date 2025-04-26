const UserSettings = require('../../services/UserSettings');
const fetchLeagueTier = require('../../shared/api/fetchLeagueOfLegendsTier');
const updateUserLoLTier = require('./modules/updateUserLoLTier');


/**
 * 오래된 순서대로 3명의 롤 티어를 업데이트합니다.
 */
module.exports = async function updateLoLTiersJob() {
    try {
        // 티어 정보 업데이트가 필요한 유저를
        const users = await UserSettings.getUsersForLoLTierUpdate();

        for (const user of users) {
            await updateUserLoLTier(user);
        }

    } catch (error) {
        console.error('updateLoLTiers', error);
    }
};