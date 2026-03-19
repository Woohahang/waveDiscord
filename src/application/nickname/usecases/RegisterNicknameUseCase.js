const logger = require('@utils/logger');
const createNicknameEntry = require('../services/createNicknameEntry');
const formatNicknameByGame = require('../services/formatNicknameByGame');
const User = require('@domain/user/entities/User');

class RegisterNicknameUseCase {
    /**
     * @typedef {import("@domain/user/repositories/UserRepository")} UserRepository
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
     * @returns {Promise<string>} 닉네임 등록 결과 키
     */
    async execute({ userId, gameType, userInput }) {
        let user = await this.userCacheRepository.get(userId);

        if (!user)
            user = await this.userRepository.findById(userId);

        if (!user)
            user = User.createEmpty(userId);

        // 게임 타입에 맞게 닉네임 입력값을 정규화합니다.
        const formattedInput = formatNicknameByGame(gameType, userInput);

        // 닉네임 기반으로 외부 게임 데이터를 조회합니다.
        const userGameData = await this.gameProfileGateway.fetch(
            gameType,
            formattedInput
        );

        // 도메인 저장 형식에 맞는 닉네임 엔트리를 생성합니다.
        const nicknameEntry = createNicknameEntry({
            gameType,
            input: formattedInput,
            externalData: userGameData,
        });

        // 유저 엔티티에 닉네임을 추가하고 결과 키를 반환받습니다.
        const result = user.addNickname(gameType, nicknameEntry);

        // 실패시 바로 반환  예: 닉네임 중복, 닉네임 개수 초과
        if (!result.ok)
            return result;

        await this.userRepository.save(user);
        await this.userCacheRepository.set(user);

        return result;
    }
}

module.exports = RegisterNicknameUseCase;