const userSchema = require('../mongoDB/userSchema');
const UserCacheManager = require('./UserCacheManager');
const fetchLeagueOfLegendsTier = require('../shared/api/fetchLeagueOfLegendsTier');
const GAME_TYPES = require('../constants/gameTypes');

class UserSettings {
    constructor(userId) {
        this.userId = userId;
    }

    async #loadOrCreateUserData() {
        let userData = UserCacheManager.get(this.userId);
        if (!userData) {
            userData = await userSchema.findOne({ userId: this.userId });
            if (!userData) {
                const newUser = new userSchema({ userId: this.userId });
                await newUser.save();
                userData = newUser;
            }
            UserCacheManager.set(this.userId, userData);
        }
        return userData;
    }


    /**
     * 리그 오브 레전드 티어 정보가 존재하는 유저들을 조회합니다.
     * 
     * @param {string[]} memberIds - 조회할 유저 ID 배열
     * @returns {Promise<Array>} 티어 정보를 가진 유저 객체 배열
    */
    static async findUsersWithLoLTierByIds(memberIds) {
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
            console.error('[UserSettings.findUsersWithLoLTierByIds] 유저 티어 조회 중 오류 발생:', error);
        }
    }

    /**
     * 리그 오브 레전드 닉네임이 등록된 유저 중, 가장 오래된 순서대로 3명을 가져옵니다.
     * 이 함수는 롤 닉네임(summonerName)이 있는 유저의 티어 정보를 업데이트하기 위한 용도로 사용됩니다.
     * 
     * @returns {Promise<Array>} 업데이트가 필요한 유저 객체 배열
    */
    static async getUsersForLoLTierUpdate() {
        try {
            return await userSchema.find({
                leagueOfLegends: {
                    $elemMatch: {
                        summonerName: { $exists: true, $ne: null }
                    }
                }
            })
                .sort({ updatedAt: 1 })
                .limit(3);
        } catch (error) {
            console.error('[UserSettings.getUsersForLoLTierUpdate] 유저 조회 중 오류 발생:', error);
        }
    }

    static async getUserCount() {
        try {
            return await userSchema.countDocuments();
        } catch (error) {
            console.error('[UserSettings.getUserCount] 유저 수 조회 중 오류 발생:', error);
        }
    }

    static async getUserlolCount() {
        return await userSchema.countDocuments({
            leagueOfLegends: { $exists: true, $not: { $size: 0 } }
        });
    }

    async loadUserData() {
        let userData = UserCacheManager.get(this.userId);
        if (!userData) {
            userData = await userSchema.findOne({ userId: this.userId });
            if (userData) {
                UserCacheManager.set(this.userId, userData);
            }
        }
        return userData;
    }

    async userNicknameSaver(game, nickname) {
        try {
            let userData = UserCacheManager.get(this.userId);
            if (!userData) {
                userData = await this.#loadOrCreateUserData();
            }

            if (game !== 'steam' && userData[game].includes(nickname)) {
                return 'nicknameDuplicate';
            }

            if (
                game === GAME_TYPES.LEAGUE_OF_LEGENDS &&
                userData[game].some(entry => entry.summonerName === nickname)
            ) {
                return 'nicknameDuplicate';
            }

            if (game !== 'steam' && userData[game].length >= 5) {
                return 'nicknameLimitExceeded';
            }

            switch (game) {
                case GAME_TYPES.STEAM:
                    userData.steam = nickname;
                    break;

                case GAME_TYPES.LEAGUE_OF_LEGENDS:
                    const tierInfo = await fetchLeagueOfLegendsTier(nickname);

                    const newEntry = {
                        summonerName: nickname,
                        tier: tierInfo?.tier || null,
                        rank: tierInfo?.rank || null,
                        leaguePoints: tierInfo?.leaguePoints ?? null,
                    };

                    userData[game].push(newEntry);
                    break;

                default:
                    userData[game].push(nickname);
                    break;
            }

            await userData.save();
            UserCacheManager.set(this.userId, userData);
            return 'saveSuccess';
        } catch (error) {
            console.error('[userNicknameSaver] 유저 닉네임 저장 중 예외 발생:', {
                game,
                nickname,
                error
            });
            throw error;
        }
    }

    async removeNickname(gameAndNicknames) {
        try {
            const userData = await this.loadUserData();
            if (!userData) return;

            gameAndNicknames.forEach(item => {
                const [game, nickname] = item.split(':');
                if (game === 'steam') {
                    userData[game] = [];
                }

                else if (game === GAME_TYPES.LEAGUE_OF_LEGENDS) {

                    const index = userData[game].findIndex(entry => entry.summonerName === nickname);
                    if (index > -1) {
                        userData[game].splice(index, 1);
                    }
                }

                else {
                    const index = userData[game].indexOf(nickname);
                    if (index > -1) {
                        userData[game].splice(index, 1);
                    }
                }
            });

            await userData.save();
            UserCacheManager.set(this.userId, userData);
            return 'removalSuccessful';
        } catch (error) {
            console.error('UserSettings.removeNickname 예외:', error);

            throw error;
        }
    }

    async deleteUserData() {
        try {
            const userData = await this.loadUserData();
            if (!userData) return 'alreadyDeleted';

            await userSchema.deleteOne({ userId: this.userId });
            UserCacheManager.delete(this.userId);
            return 'deleteSuccess';
        } catch (error) {
            console.error('UserSettings.deleteUserData 예외:', error);
            return 'deleteError';
        }
    }


    getUserCount() {
        return UserCacheManager.count();
    }
}

module.exports = UserSettings;