const USER_RESULT_CODES = require('@domain/user/constants/userResultCodes');
const Result = require('@shared/result/result');

class RemoveNicknameUseCase {

    /**
     * @typedef {import("@domain/user/repositories/userRepository")} UserRepository
     * @typedef {import("@application/user/ports/userCacheRepository")} UserCacheRepository 
    */

    /**
     * @param {Object} deps
     * @param {UserRepository} deps.userRepository
     * @param {UserCacheRepository} deps.userCacheRepository
    */
    constructor({ userRepository, userCacheRepository }) {
        this.userRepository = userRepository;
        this.userCacheRepository = userCacheRepository;
    }

    /**
     * 캐시 → DB 순서로 유저를 조회합니다.
     *
     * @param {string} userId
     * @returns {Promise<User|null>}
    */
    async #loadUser(userId) {
        const cacheResult = await this.userCacheRepository.get(userId);

        if (cacheResult.hit)
            return cacheResult.value;

        const user = await this.userRepository.findById(userId);
        await this.userCacheRepository.set(userId, user ?? null);

        return user;
    }

    async execute({ userId, nicknameEntryIds }) {
        try {
            const user = await this.#loadUser(userId);

            if (!user)
                return Result.fail({
                    code: USER_RESULT_CODES.USER_NOT_FOUND
                });

            const domainResult = user.removeNicknamesByEntryIds(nicknameEntryIds);

            if (!domainResult.ok)
                return Result.fail({
                    code: domainResult.code
                });

            await this.userRepository.save(user);
            await this.userCacheRepository.set(userId, user);

            return Result.ok({
                code: domainResult.code
            });

        } catch (error) {
            console.log("[RemoveNicknameUseCase] 닉네임 삭제중 에러", error);
            throw error;
        }
    }

}

module.exports = RemoveNicknameUseCase;