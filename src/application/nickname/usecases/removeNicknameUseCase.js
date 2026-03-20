const USER_RESULT_CODES = require('@domain/user/constants/userResultCodes');

class RemoveNicknameUseCase {

    /**
     * @typedef {import("@domain/user/repositories/UserRepository")} UserRepository
    */

    /**
     * @param {Object} deps
     * @param {UserRepository} deps.userRepository
    */
    constructor({ userRepository, userCacheRepository }) {
        this.userRepository = userRepository;
        this.userCacheRepository = userCacheRepository;
    }

    async execute({ userId, nicknameEntryIds }) {
        let user = await this.userCacheRepository.get(userId);

        if (!user)
            user = await this.userRepository.findById(userId);

        if (!user)
            return {
                ok: false,
                code: USER_RESULT_CODES.USER_NOT_FOUND,
            };

        const result = user.removeNicknamesByIds(nicknameEntryIds);

        if (!result.ok)
            return result;

        await this.userRepository.save(user);
        await this.userCacheRepository.set(user);

        return result;
    }

}

module.exports = RemoveNicknameUseCase;