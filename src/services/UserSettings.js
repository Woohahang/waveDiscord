const UserCacheManager = require('./UserCacheManager');
const userRepository = require('@repositories/userRepository');
const GAME_TYPES = require('../constants/gameTypes');
const STATE_KEYS = require('@constants/stateKeys');
const logger = require('@utils/logger');
const ERROR_KEY = require('@constants/errorKeys');

class UserSettings {
    constructor(userId) {
        this.userId = userId;
    }

    async loadOrCreateUserData() {
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
                errorMEssage: error.message,
                userId: this.userId
            })
            throw error;
        }
    }


    async saveUserGameNickname(gameType, nicknameEntry) {
        try {
            let userData = UserCacheManager.get(this.userId);
            if (!userData)
                userData = await this.loadOrCreateUserData();

            userData[gameType].push(nicknameEntry);

            await userRepository.saveUserData(userData);
            UserCacheManager.set(this.userId, userData);

            return STATE_KEYS.NICKNAME_SAVE_SUCCESS;
        } catch (error) {
            logger.error('[UserSettings.saveUserGameNickname] 닉네임 저장 중 오류', {
                userId: this.userId,
                gameType,
                nicknameEntry: JSON.stringify(nicknameEntry),
                stack: error.stack
            });

            return ERROR_KEY.NICKNAME_SAVE_FAILED;
        }
    }

    async removeNicknames(nicknamesToRemove) {
        const userData = await this.loadUserData();

        for (const { gameType, nickname } of nicknamesToRemove) {
            switch (gameType) {
                case GAME_TYPES.STEAM:
                case GAME_TYPES.LEAGUE_OF_LEGENDS: {
                    const index = userData[gameType].findIndex(entry => entry.nickname === nickname);
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