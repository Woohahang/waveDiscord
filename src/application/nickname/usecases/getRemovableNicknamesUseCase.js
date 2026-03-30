const RESULT_CODES = require('@application/constants/resultCodes');
const Result = require('@shared/result/result');

class GetRemovableNicknamesUseCase {
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
     * 삭제 가능한 닉네임 목록을 반환합니다.
     *
     * @param {Object} input
     * @param {string} input.userId
     *
     * @returns {Promise<
     *   | { ok: true, data: Array<{ entryId: string, gameType: string, nickname: string }> }
     *   | { ok: false, code: string }
     * >}
    */
    async execute({ userId }) {
        const user = await this.#loadUser(userId);

        if (!user)
            return Result.fail({
                code: RESULT_CODES.USER.COMMON.NOT_FOUND
            })

        const allNicknames = user.getAllNicknames();

        if (allNicknames.length < 1)
            return Result.fail({
                code: RESULT_CODES.USER.REMOVE_NICKNAME.NOT_FOUND,
            })

        return Result.ok({
            data: allNicknames,
        });
    }

}

module.exports = GetRemovableNicknamesUseCase;