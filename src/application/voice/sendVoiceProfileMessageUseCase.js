const Result = require('@shared/result/result');

class SendVoiceProfileMessageUseCase {

    constructor({ userRepository, guildRepository, userCacheRepository, guildCacheRepository }) {
        this.userRepository = userRepository;
        this.guildRepository = guildRepository;
        this.userCacheRepository = userCacheRepository;
        this.guildCacheRepository = guildCacheRepository;
    }

    /**
     * 캐시 → DB 순서로 유저를 조회합니다.
     *
     * @param {string} userId
     * @returns {Promise<User|null>}
    */
    async #loadUser(userId) {
        const cachedUser = await this.userCacheRepository.get(userId);

        if (cachedUser.hit)
            return cachedUser.value;

        const user = await this.userRepository.findById(userId);
        await this.userCacheRepository.set(userId, user ?? null);

        return user;
    }

    /**
     * 캐시 → DB 순서로 길드를 조회합니다.
     *
     * @param {string} guildId
     * @returns {Promise<Guild|null>}
    */
    async #loadGuild(guildId) {
        const cachedGuild = await this.guildCacheRepository.get(guildId);

        if (cachedGuild)
            return cachedGuild;

        const guild = await this.guildRepository.findById(guildId);
        await this.guildCacheRepository.set(guild);

        return guild;
    }

    async execute({ userId, guildId }) {

        const user = await this.#loadUser(userId);

        // 유저 정보가 없다면 작업 종료
        if (!user)
            return Result.ok({ data: null });

        const guild = await this.#loadGuild(guildId);

        if (!guild)
            throw new Error("[SendVoiceProfileMessageUseCase] 길드 정보를 찾을 수 없습니다.");

        // 활성화된 게임을 가지고 옵니다.
        const enabledGames = guild.getEnabledGames();

        // 활성화된 게임 중에 유저 닉네임을 가지고 옵니다.
        const nicknameGroups = user.getNicknamesByGameTypes(enabledGames);

        if (nicknameGroups.length === 0)
            return Result.ok({ data: null });

        return Result.ok({
            data: {
                profiles: nicknameGroups,
            }
        });

    }

}

module.exports = SendVoiceProfileMessageUseCase;