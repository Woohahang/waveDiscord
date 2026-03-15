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

    async execute({ userId, nicknamesToRemove }) {
        let user = await this.userRepository.findById(userId);

        if (!user) {
            return console.log('[RemoveNicknameUseCase] user not');
        }

        const resultKey = user.removeNicknames(nicknamesToRemove);

        await this.userRepository.save(user);

        return resultKey;
    }

}

module.exports = RemoveNicknameUseCase;