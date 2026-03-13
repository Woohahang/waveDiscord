const logger = require('@utils/logger');
const sendStateMessage = require('@utils/discord/sendStateMessage');
const REPLY_METHODS = require('@constants/replyMethods');
const getValidationError = require('../../../modules/nicknameFlow/utils/getNicknameValidationError');
const format = require('../../../modules/nicknameFlow/utils/formatNicknameByGame');
const userGameDataService = require('../../../modules/nicknameFlow/utils/fetchUserGameData');
const nicknameEntryFactory = require('../../../modules/nicknameFlow/utils/createUserGameEntry');
const getNicknameAvailabilityError = require('../../../modules/nicknameFlow/utils/getNicknameAvailabilityError');

class RegisterNicknameUseCase {
    /**
     * @param {Object} deps
     * @param {import("@domain/user/repositories/UserRepository")} deps.userRepository
     */
    constructor({ userRepository }) {
        this.userRepository = userRepository;
    }

    /**
     * @param {Object} command
     * @param {string} command.userId
     * @param {string} command.gameType
     * @param {string} command.nickname
     * @returns {Promise<User>}
     */
    async execute({ userId, gameType, nickname }) {
        let user = await this.userRepository.findById(userId);

        // 게임 마다 닉네임 규칙
        // const formattedNickname = normalizeNicknameByGame(gameType, nickname);

        // 게임 닉네임에 적용시킬 프로필 주소 (ex, steam 주소)
        // const userGameData = await this.userGameDataService.fetch(gameType, formattedNickname);

        // 게임마다 티어 저장
        // const nicknameEntry = createUserGameEntry(gameType, formattedNickname, userGameData);

        const resultKey = user.addNickname(gameType, nickname);

        await this.userRepository.save(user);

        return resultKey;
    }
}

module.exports = RegisterNicknameUseCase;