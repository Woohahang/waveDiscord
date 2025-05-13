const UserCacheManager = require('./UserCacheManager');
const userRepository = require('@repositories/userRepository');
const fetchLeagueOfLegendsTier = require('../shared/api/fetchLeagueOfLegendsTier');
const GAME_TYPES = require('../constants/gameTypes');
const STATE_KEYS = require('@constants/stateKeys');
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


    async saveNickname(gameType, nickname) {
        try {
            let userData = UserCacheManager.get(this.userId);
            if (!userData)
                userData = await this.#loadOrCreateUserData();

            // 게임 종류에 따라 닉네임을 저장
            switch (gameType) {
                case GAME_TYPES.STEAM:
                    userData.steam = nickname;
                    break;

                case GAME_TYPES.LEAGUE_OF_LEGENDS:
                    // 리그 오브 레전드 게임의 경우, 티어 정보를 가져와서 닉네임과 함께 저장
                    const tierInfo = await fetchLeagueOfLegendsTier(nickname);

                    const newEntry = {
                        summonerName: nickname, // 소환사 이름
                        tier: tierInfo?.tier || null, // 티어
                        rank: tierInfo?.rank || null,  // 랭크
                        leaguePoints: tierInfo?.leaguePoints ?? null,  // 리그 포인트
                    };

                    userData[gameType].push(newEntry);
                    break;

                default:
                    userData[gameType].push(nickname);
                    break;
            }

            await userRepository.saveUserData(userData);
            UserCacheManager.set(this.userId, userData);

        } catch (error) {
            console.error('[userNicknameSaver] 닉네임 저장 중 DB 오류', {
                gameType,
                nickname,
                errorMessage: error.message
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
        return STATE_KEYS.NICKNAME_DELETE_SUCCESS;
    }

    async deleteUserData() {
        try {
            const userData = await this.loadUserData();
            if (!userData) return STATE_KEYS.NO_USER_DATA;

            await userRepository.deleteUserById(this.userId);
            UserCacheManager.delete(this.userId);
            return STATE_KEYS.DELETE_SUCCESS;

        } catch (error) {
            logger.error('[UserSettings.deleteUserData] 사용자 정보 삭제 중 DB 처리 실패', {
                errorMessage: error.message,
                userId: this.userId
            });
            return STATE_KEYS.DELETE_FAIL;
        }
    }

}

module.exports = UserSettings;