const userRepository = require("@repositories/userRepository");
const { GAME_TYPES } = require("@constants/gameTypes");

const repositoryMethodMap = {
    [GAME_TYPES.LEAGUE_OF_LEGENDS]: 'findUsersWithLoLTierByIds',
    // 다른 게임 추가 가능
};

/**
 * 게임 타입에 따라 Repository에서 유저 티어 목록을 조회합니다.
 * @param {string} gameType - 게임 타입 상수
 * @param {string[]} memberIds - 조회할 유저 ID 목록
 * @returns {Promise<Array>} 유저 데이터 목록
 */
async function getGameTierUsers(gameType, memberIds) {
    const methodName = repositoryMethodMap[gameType];
    if (!userRepository[methodName]) {
        throw new Error(`[getGameTierUsers] UserRepository 메서드 없음: ${methodName}`);
    }

    return await userRepository[methodName](memberIds);
}

module.exports = getGameTierUsers;
