const userRepository = require('@repositories/userRepository');
const updateUserLoLTier = require('./updateUserLoLTier');
const logger = require('@utils/logger');

/**
 * 티어 자동 업데이트
 * 오래된 순서대로 3명의 롤 티어를 업데이트합니다.
 */
module.exports = async () => {
    try {
        // 티어 정보 업데이트가 필요한 유저를
        const users = await userRepository.getUsersForLoLTierUpdate();

        for (const user of users) {
            await updateUserLoLTier(user);
        }
    } catch (error) {
        logger.error('[autoUpdateTiers] 자동 업데이트 중 오류 발생', {
            stakc: error.stakc
        })
    }
};