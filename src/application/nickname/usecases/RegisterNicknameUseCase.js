const createNicknameEntry = require('../services/createNicknameEntry');
const formatNicknameByGame = require('../services/formatNicknameByGame');
const User = require('@domain/user/entities/User');
const Result = require('@shared/result/result');
const DuplicateNicknameError = require('@domain/user/errors/duplicateNicknameError');
const NicknameLimitExceededError = require('@domain/user/errors/nicknameLimitExceededError');
const logger = require('@utils/logger');
const STATE_KEYS = require('@constants/stateKeys');

class RegisterNicknameUseCase {
    /**
     * @typedef {import("@domain/user/repositories/userRepository")} UserRepository
     * @typedef {import("@application/user/ports/userCacheRepository")} UserCacheRepository
     * @typedef {import("@application/nickname/ports/gameProfileGateway")} GameProfileGateway
    */

    /**
     * @param {Object} deps
     * @param {UserRepository} deps.userRepository
     * @param {UserCacheRepository} deps.userCacheRepository
     * @param {GameProfileGateway} deps.gameProfileGateway
    */
    constructor({ userRepository, userCacheRepository, gameProfileGateway }) {
        this.userRepository = userRepository;
        this.userCacheRepository = userCacheRepository;
        this.gameProfileGateway = gameProfileGateway;
    }

    /**
     * 사용자의 게임 닉네임을 등록합니다.
     *
     * @param {Object} input
     * @param {string} input.userId
     * @param {string} input.gameType
     * @param {string} input.userInput
     * @returns {Promise<Result>}
    */
    async #loadUser(userId) {
        const cachedUser = await this.userCacheRepository.get(userId);

        if (cachedUser.hit)
            return cachedUser.value;

        const user = await this.userRepository.findById(userId);
        await this.userCacheRepository.set(userId, user ?? null);

        return user;
    }

    /**
     * 사용자의 게임 닉네임을 등록합니다.
     *
     * @param {Object} input
     * @param {string} input.userId
     * @param {string} input.gameType
     * @param {string} input.userInput
     * @returns {Promise<string>} 닉네임 등록 결과 키
     */
    async execute({ userId, gameType, userInput }) {
        try {

            let user = await this.#loadUser(userId);

            if (!user)
                user = User.createEmpty(userId);

            // 게임 타입에 맞게 닉네임 입력값을 정규화합니다.
            const formattedResult = formatNicknameByGame(gameType, userInput);

            if (!formattedResult.ok)
                return formattedResult;

            // 닉네임 기반으로 외부 게임 데이터를 조회합니다.
            const userGameData = await this.gameProfileGateway.fetch(
                gameType,
                formattedResult.value
            );

            // 도메인 저장 형식에 맞는 닉네임 엔트리를 생성합니다.
            const nicknameEntry = createNicknameEntry({
                gameType,
                input: formattedResult.value,
                externalData: userGameData,
            });

            // 유저 엔티티에 닉네임을 추가하고 결과 키를 반환받습니다.
            user.addNickname(gameType, nicknameEntry);

            // DB 저장 및 최신 상태로 캐시에 반영합니다.
            await this.userRepository.save(user);
            await this.userCacheRepository.set(userId, user);

            return Result.ok({
                code: STATE_KEYS.USER.REGISTER_NICKNAME.SUCCESS,
            });

        } catch (error) {
            if (error instanceof DuplicateNicknameError)
                return Result.fail({
                    code: STATE_KEYS.USER.REGISTER_NICKNAME.DUPLICATE
                });

            if (error instanceof NicknameLimitExceededError)
                return Result.fail({
                    code: STATE_KEYS.USER.REGISTER_NICKNAME.LIMIT_EXCEEDED
                });

            logger.error('[RegisterNicknameUseCase] 에러', {
                userId,
                gameType,
                userInput,
                stack: error.stack,
            });

            throw error;
        }
    }
}

module.exports = RegisterNicknameUseCase;