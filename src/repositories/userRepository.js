const userSchema = require('../mongoDB/userSchema');

class UserRepository {

    /**
     * 유저 데이터를 DB에 저장합니다.
     * 
     * @param {Object} userData - 저장할 유저 데이터
     * @returns {Promise<void>}
     */
    async saveUserData(userData) {
        try {
            if (!userData)
                throw new Error('유저 데이터가 유효하지 않습니다.');

            await userData.save();
        } catch (error) {
            throw new Error('[UserRepository.saveUserData] 유저 데이터 저장 중 오류 발생: ' + error.message);
        }
    }

    async findUserById(userId) {
        return userSchema.findOne({ userId });
    }

    async createUserById(userId) {
        const newUser = new userSchema({ userId });
        return await newUser.save();
    }

    async deleteUserById(userId) {
        return userSchema.deleteOne({ userId });
    }

    /**
     * 리그 오브 레전드 티어 정보가 존재하는 유저들을 조회합니다.
     * 
     * @param {string[]} memberIds - 조회할 유저 ID 배열
     * @returns {Promise<Array>} 티어 정보를 가진 유저 객체 배열
    */
    async findUsersWithLoLTierByIds(memberIds) {
        try {
            return await userSchema.find({
                userId: { $in: memberIds },
                leagueOfLegends: {
                    $elemMatch: {
                        tier: { $ne: null }
                    }
                }
            });
        } catch (error) {
            throw new Error('[UserRepository.findUsersWithLoLTierByIds] 유저 티어 조회 중 오류 발생:' + error.message)
        }
    }

    /**
     * 리그 오브 레전드 닉네임이 등록된 유저 중, 가장 오래된 순서대로 3명을 가져옵니다.
     * 이 함수는 롤 닉네임(summonerName)이 있는 유저의 티어 정보를 업데이트하기 위한 용도로 사용됩니다.
     * 
     * @returns {Promise<Array>} 업데이트가 필요한 유저 객체 배열
    */
    async getUsersForLoLTierUpdate() {
        try {
            return await userSchema.find({
                leagueOfLegends: {
                    $elemMatch: {
                        summonerName: { $exists: true, $ne: null }
                    }
                }
            })
                .sort({ updatedAt: 1 })
                .limit(35);
        } catch (error) {
            throw new Error('[UserRepository.getUsersForLoLTierUpdate] 유저 조회 중 오류 발생:' + error.message);
        }
    }

}

module.exports = new UserRepository();