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

        console.log("[RegisterNicknameUseCase.execute] user:", user);

        user.setNickname(gameType, nickname);

        await this.userRepository.save(user);

        return user;
    }
}

module.exports = RegisterNicknameUseCase;