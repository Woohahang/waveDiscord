const STATE_KEYS = require('@constants/stateKeys');

class GetRemovableNicknamesUseCase {
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

    async execute({ userId }) {
        let user = await this.userRepository.findById(userId);

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