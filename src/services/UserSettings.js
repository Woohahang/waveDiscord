const UserCacheManager = require('./UserCacheManager');
const userRepository = require('@repositories/userRepository');
const GAME_TYPES = require('../constants/gameTypes');
const STATE_KEYS = require('@constants/stateKeys');
const logger = require('@utils/logger');
const ERROR_KEY = require('@constants/errorKeys');
const UserProfileDto = require('@dtos/UserProfileDto');

class UserSettings {
    constructor(userId) {
        this.userId = userId;
    }

    async loadOrCreateUserData() {
        let userData = UserCacheManager.get(this.userId);

        if (!userData.exists) {
            let userDoc = await userRepository.findUserById(this.userId);

            if (!userDoc) {
                userDoc = await userRepository.createUserById(this.userId);
            }

            userData = new UserProfileDto(userDoc);
            UserCacheManager.set(this.userId, userData);
        }

        return userData;
    }

    async loadUserData() {
        try {
            let userProfileDto = UserCacheManager.get(this.userId);
            if (!userProfileDto?.exists) {
                const userDoc = await this.loadUserDoc();
                if (userDoc)
                    userProfileDto = new UserProfileDto(userDoc);
                else
                    userProfileDto = new UserProfileDto(null);

            }
            UserCacheManager.set(this.userId, userProfileDto);

            return userProfileDto;
        } catch (error) {
            logger.error('[UserSettings.loadUserData] 유저 프로필 불러오는 중 오류', {
                errorMessage: error.message,
                userId: this.userId
            })
            throw error;
        }
    }

    async loadUserDoc() {
        try {
            return await userRepository.findUserById(this.userId);
        } catch (error) {
            logger.error('[UserSettings.loadUserDoc] 유저 문서 불러오는 중 오류', {
                errorMessage: error.message,
                userId: this.userId
            })
            throw error;
        }
    }

    async createUserDoc() {
        try {
            return await userRepository.createUserById(this.userId);
        } catch (error) {
            logger.error('[UserSettings.createUserDoc] 유저 문서 생성 중 오류', {
                errorMessage: error.message,
                userId: this.userId
            })
        }
    }

    async loadOrCreateUserDoc() {
        try {
            let userDoc = await this.loadUserDoc();
            if (!userDoc) {
                userDoc = await this.createUserDoc();
            }
            return userDoc;
        } catch (error) {
            throw error;
        }
    }

    async saveUserGameNickname(gameType, nicknameEntry) {
        try {
            const userDoc = await userRepository.findUserById(this.userId);

            userDoc[gameType].push(nicknameEntry);
            await userRepository.saveUserDoc(userDoc);

            const userProfileDto = new UserProfileDto(userDoc);
            UserCacheManager.set(this.userId, userProfileDto);

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
        const userDoc = await this.loadUserDoc();

        for (const { gameType, nickname } of nicknamesToRemove) {
            switch (gameType) {
                case GAME_TYPES.STEAM:
                case GAME_TYPES.LEAGUE_OF_LEGENDS: {
                    const index = userDoc[gameType].findIndex(entry => entry.nickname === nickname);
                    if (index > -1) userDoc[gameType].splice(index, 1);
                } break;

                default: {
                    const index = userDoc[gameType].indexOf(nickname);
                    if (index > -1) userDoc[gameType].splice(index, 1);
                } break;
            }
        }

        await userDoc.save();
        const userProfileDto = new UserProfileDto(userDoc);
        UserCacheManager.set(this.userId, userProfileDto);
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