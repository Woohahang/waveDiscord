const logger = require('@utils/logger');
const fetchUserGameData = require('../../../modules/nicknameFlow/utils/fetchUserGameData');
const createNicknameEntry = require('../services/createNicknameEntry');
const formatNicknameByGame = require('../services/formatNicknameByGame');
const User = require('@domain/user/entities/User');

class RegisterNicknameUseCase {
    /**
     * @typedef {import("@domain/user/repositories/UserRepository")} UserRepository
    */

    /**
     * @param {Object} deps
     * @param {UserRepository} deps.userRepository
    */
    constructor({ userRepository }) {
        this.userRepository = userRepository;
    }

    /**
     * 사용자의 게임 닉네임을 등록합니다.
     *
     * 처리 흐름
     * 1. 유저를 조회하고, 없으면 빈 유저를 생성합니다.
     * 2. 게임 타입에 맞게 입력 닉네임 형식을 정리합니다.
     * 3. 외부 게임 데이터를 조회합니다.
     * 4. 저장용 닉네임 엔트리를 생성합니다.
     * 5. 유저 엔티티에 닉네임을 추가합니다.
     * 6. 변경된 유저를 저장합니다.
     *
     * @param {Object} input
     * @param {string} input.userId
     * @param {string} input.gameType
     * @param {string} input.userInput
     * @returns {Promise<string>} 닉네임 등록 결과 키
     */
    async execute({ userId, gameType, userInput }) {
        let user = await this.userRepository.findById(userId);

        if (!user)
            user = User.createEmpty(userId);

        // 게임 타입에 맞게 닉네임 입력값을 정규화합니다.
        const formattedInput = formatNicknameByGame(gameType, userInput);

        // 닉네임 기반으로 외부 게임 데이터를 조회합니다.
        const userGameData = await fetchUserGameData(gameType, formattedInput);

        // 도메인 저장 형식에 맞는 닉네임 엔트리를 생성합니다.
        const nicknameEntry = createNicknameEntry(gameType, formattedInput, userGameData);

        // 유저 엔티티에 닉네임을 추가하고 결과 키를 반환받습니다.
        const resultKey = user.addNickname(gameType, nicknameEntry);

        await this.userRepository.save(user);

        return resultKey;
    }
}

module.exports = RegisterNicknameUseCase;