class RemoveNicknameUseCase {

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

    async execute({ userId, nicknameEntryIds }) {
        let user = await this.userRepository.findById(userId);

        if (!user) {
            return console.log('[RemoveNicknameUseCase] user not');
        }

        const result = user.removeNicknamesByIds(nicknameEntryIds);

        if (!result.ok)
            return result;

        await this.userRepository.save(user);

        return result;
    }

}

module.exports = RemoveNicknameUseCase;