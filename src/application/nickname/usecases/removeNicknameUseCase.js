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
        try {
            const cachedUser = await this.userCacheRepository.get(userId);

            let user;
            if (cachedUser.hit)
                user = cachedUser.value;
            else
                user = await this.userRepository.findById(userId);

            if (!user)
                return {
                    ok: false,
                    code: USER_RESULT_CODES.USER_NOT_FOUND,
                };

            const result = user.removeNicknamesByEntryIds(nicknameEntryIds);

            if (!result.ok)
                return result;

            await this.userRepository.save(user);
            await this.userCacheRepository.set(userId, user);

            return result;
        } catch (error) {
            console.log("[RemoveNicknameUseCase] 닉네임 삭제중 에러", error);
        }
    }

}

module.exports = RemoveNicknameUseCase;