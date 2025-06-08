const UserCacheManager = require('./UserCacheManager');
const userRepository = require('@repositories/userRepository');
const { GAME_TYPES } = require('../constants/gameTypes');
const STATE_KEYS = require('@constants/stateKeys');
const logger = require('@utils/logger');
const ERROR_KEY = require('@constants/errorKeys');
const UserProfileDto = require('@dtos/userProfileDto');

class UserSettings {
    constructor(userId) {
        this.userId = userId;
        this.userDoc = null;
    }

    /**
     * 유저의 프로필 정보를 반환합니다.
     * 
     * - 먼저 캐시에서 DTO를 조회합니다.
     * - 존재하지 않으면 DB에서 로드한 뒤 캐시에 저장합니다.
     * - 유저가 없는 경우(null)도 캐시에 저장하여 DB 재호출을 방지합니다.
     *
     * @returns {UserProfileDto|null} 유저 프로필 DTO 또는 null (없는 유저일 경우)
    */
    async getProfile() {
        try {
            const cachedDto = UserCacheManager.get(this.userId);

            if (cachedDto) {
                if (!cachedDto.exists) return null;
                return cachedDto;
            }

            const userDoc = await this.loadDoc();
            const profileDto = new UserProfileDto(userDoc);
            UserCacheManager.set(this.userId, profileDto);

            return profileDto;

        } catch (error) {
            logger.error('[UserSettings.getProfile] 유저 프로필 불러오는 중 오류', {
                errorMessage: error.message,
                userId: this.userId
            })
            throw error;
        }
    }

    async loadDoc() {
        try {
            if (this.userDoc) return this.userDoc;
            this.userDoc = await userRepository.findUserById(this.userId);
            return this.userDoc;

        } catch (error) {
            logger.error('[UserSettings.loadDoc] 유저 문서 불러오는 중 오류', {
                errorMessage: error.message,
                userId: this.userId
            })
            throw error;
        }
    }

    async createDoc() {
        try {
            this.userDoc = await userRepository.createUserById(this.userId);
            return this.userDoc;
        } catch (error) {
            logger.error('[UserSettings.createDoc] 유저 문서 생성 중 오류', {
                errorMessage: error.message,
                userId: this.userId
            })
            throw error;
        }
    }

    async loadOrCreateDoc() {
        try {
            let userDoc = await this.loadDoc();
            if (!userDoc)
                userDoc = await this.createDoc();

            return userDoc;
        } catch (error) {
            throw error;
        }
    }

    /**
     * 특정 게임 타입에 닉네임을 추가하여 저장합니다.
     * 
     * @param {string} gameType - 닉네임을 추가할 게임 타입 (예: 'leagueOfLegends', 'steam' 등)
     * @param {Object} nicknameEntry - 추가할 닉네임 정보 객체 (예: { nickname: '닉네임', ... })
     * @returns {Promise<string>} 성공 시 닉네임 저장 성공 상태 키, 실패 시 에러 상태 키 반환
    */
    async saveNickname(gameType, nicknameEntry) {
        try {
            const updatedUserDoc = await userRepository.addNickname(this.userId, gameType, nicknameEntry);

            this.userDoc = updatedUserDoc;

            const userProfileDto = new UserProfileDto(updatedUserDoc);
            UserCacheManager.set(this.userId, userProfileDto);

            return STATE_KEYS.NICKNAME_SAVE_SUCCESS;
        } catch (error) {
            logger.error('[UserSettings.saveNickname] 닉네임 저장 중 오류', {
                userId: this.userId,
                gameType,
                nicknameEntry: JSON.stringify(nicknameEntry),
                stack: error.stack
            });

            return ERROR_KEY.NICKNAME_SAVE_FAILED;
        }
    }

    async removeNicknames(nicknamesToRemove) {
        try {
            for (const { gameType, nickname } of nicknamesToRemove) {
                let pullCondition;
                switch (gameType) {
                    case GAME_TYPES.STEAM:
                    case GAME_TYPES.LEAGUE_OF_LEGENDS:
                        pullCondition = { nickname };
                        break;
                    default:
                        pullCondition = nickname;
                }

                await userRepository.pullNicknameFromGameType(this.userId, gameType, pullCondition);
            }

            const updatedDoc = await this.loadDoc();

            this.userDoc = updatedDoc;

            const userProfileDto = new UserProfileDto(updatedDoc);
            UserCacheManager.set(this.userId, userProfileDto);

            return STATE_KEYS.NICKNAME_DELETE_SUCCESS;
        } catch (error) {
            logger.error('[UserSettings.removeNicknames] 닉네임 제거 실패', {
                userId: this.userId,
                errorMessage: error.message
            });
            throw error;
        }
    }

    async deleteUser() {
        try {
            const userDoc = await this.loadDoc();
            if (!userDoc) return STATE_KEYS.NO_USER_DATA;

            await userRepository.deleteUserById(this.userId);
            UserCacheManager.delete(this.userId);

            this.userDoc = null;

            return STATE_KEYS.DELETE_SUCCESS;

        } catch (error) {
            logger.error('[UserSettings.deleteUser] 사용자 정보 삭제 중 DB 처리 실패', {
                errorMessage: error.message,
                userId: this.userId
            });
            return STATE_KEYS.DELETE_FAIL;
        }
    }

}

module.exports = UserSettings;