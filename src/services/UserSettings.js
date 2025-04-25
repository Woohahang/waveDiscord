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

    static async findUsersWithLoLTierByIds(memberIds) {
        return await userSchema.find({
            userId: { $in: memberIds },
            leagueOfLegends: {
                $elemMatch: {
                    tier: { $ne: null }
                }
            }
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

    async saveNickname(game, nickname) {
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
            console.error('[saveNickname] 유저 닉네임 저장 중 예외 발생:', {
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