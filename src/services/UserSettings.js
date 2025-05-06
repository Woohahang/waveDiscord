const UserCacheManager = require('./UserCacheManager');
const userRepository = require('@repositories/userRepository');
const fetchLeagueOfLegendsTier = require('../shared/api/fetchLeagueOfLegendsTier');
const GAME_TYPES = require('../constants/gameTypes');
const logger = require('@utils/logger');

class UserSettings {
    constructor(userId) {
        this.userId = userId;
    }

    async #loadOrCreateUserData() {
        let userData = UserCacheManager.get(this.userId);
        if (!userData) {
            userData = await userRepository.findUserById(this.userId);

            if (!userData) {
                userData = await userRepository.createUserById(this.userId);
            }
            UserCacheManager.set(this.userId, userData);
        }
        return userData;
    }

    async loadUserData() {
        try {
            let userData = UserCacheManager.get(this.userId);
            if (!userData) {
                userData = await userRepository.findUserById(this.userId);
                if (userData) {
                    UserCacheManager.set(this.userId, userData);
                }
            }
            return userData;
        } catch (error) {
            logger.error('[UserSettings.loadUserData] 유저 정보를 불러오는 중 오류', {
                userId: this.userId,
                stack: error.stack
            })
        }
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

    async removeNicknames(nicknamesToRemove) {
        const userData = await this.loadUserData();

        for (const { gameType, nickname } of nicknamesToRemove) {
            switch (gameType) {
                case GAME_TYPES.STEAM:
                    userData[gameType] = [];
                    break;

                case GAME_TYPES.LEAGUE_OF_LEGENDS: {
                    const index = userData[gameType].findIndex(entry => entry.summonerName === nickname);
                    if (index > -1) userData[gameType].splice(index, 1);
                } break;

                default: {
                    const index = userData[gameType].indexOf(nickname);
                    if (index > -1) userData[gameType].splice(index, 1);
                } break;
            }
        }

        await userData.save();
        UserCacheManager.set(this.userId, userData);
        return 'removalSuccessful';
    }

    async deleteUserData() {
        try {
            const userData = await this.loadUserData();
            if (!userData) return 'alreadyDeleted';

            await userRepository.deleteUserById(this.userId);
            UserCacheManager.delete(this.userId);

            return 'deleteSuccess';

        } catch (error) {
            console.error('UserSettings.deleteUserData 예외:', error);
            return 'deleteError';
        }
    }

}

module.exports = UserSettings;