const Result = require('@shared/result/result');
const RESULT_CODES = require('@application/constants/resultCodes');

class DeleteUserInfoUseCase {
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

    /**
     * 사용자 정보를 완전히 삭제합니다.
     *
     * @param {Object} param
     * @param {string} param.userId
     * @returns {Promise<Result>}
     */
    async execute({ userId }) {

        const user = await this.#loadUser(userId);

        // 유저가 없는 경우
        if (!user) {
            return Result.fail({
                code: RESULT_CODES.USER.COMMON.NOT_FOUND,
            });
        }

        // 실제 삭제
        await this.userRepository.deleteById(userId);

        // 캐시 제거
        await this.userCacheRepository.delete(userId);

        return Result.ok({
            code: RESULT_CODES.USER.DELETE.SUCCESS,
        });
    }
}

module.exports = DeleteUserInfoUseCase;