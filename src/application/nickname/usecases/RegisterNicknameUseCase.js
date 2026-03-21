const createNicknameEntry = require('../services/createNicknameEntry');
const formatNicknameByGame = require('../services/formatNicknameByGame');
const User = require('@domain/user/entities/User');

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
     * 캐시 → DB 순서로 유저를 조회합니다.
     *
     * @param {string} userId
     * @returns {Promise<User|null>}
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

        const user = await this.#loadUser(userId);

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
        const result = user.addNickname(gameType, nicknameEntry);

        // 실패시 바로 반환  예: 닉네임 중복, 닉네임 개수 초과
        if (!result.ok)
            return result;

        // DB 저장 및 최신 상태로 캐시에 반영합니다.
        await this.userRepository.save(user);
        await this.userCacheRepository.set(userId, user);

        return result;
    }
}

module.exports = RegisterNicknameUseCase;