const STATE_KEYS = require('@constants/stateKeys');

class GetRemovableNicknamesUseCase {
    /**
     * @typedef {import("@domain/user/repositories/UserRepository")} UserRepository
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

    async execute({ userId }) {
        let user = await this.userCacheRepository.get(userId);

        if (!user)
            user = await this.userRepository.findById(userId);

        if (!user)
            return {
                ok: false,
                code: STATE_KEYS.NO_USER_DATA,
            }

        const allNicknames = user.getAllNicknames();

        if (allNicknames.length < 1)
            return {
                ok: false,
                code: STATE_KEYS.NO_NICKNAMES,
            }

        return {
            ok: true,
            data: allNicknames,
        };
    }

}

module.exports = GetRemovableNicknamesUseCase;