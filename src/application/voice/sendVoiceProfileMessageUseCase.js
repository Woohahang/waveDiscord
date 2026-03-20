class SendVoiceProfileMessageUseCase {

    constructor({ userRepository, guildRepository, userCacheRepository, guildCacheRepository }) {
        this.userRepository = userRepository;
        this.guildRepository = guildRepository;
        this.userCacheRepository = userCacheRepository;
        this.guildCacheRepository = guildCacheRepository;
    }

    async execute({ userId, guildId }) {
        const cachedUser = await this.userCacheRepository.get(userId);

        let user;
        if (cachedUser.hit)
            user = cachedUser.value;
        else {
            user = await this.userRepository.findById(userId);
            await this.userCacheRepository.set(userId, user ?? null);
        }

        // 유저 정보가 없다면 작업 종료
        if (!user)
            return {
                ok: false
            }


        let guild = await this.guildCacheRepository.get(guildId);

        if (!guild) {
            guild = await this.guildRepository.findById(guildId);
            await this.guildCacheRepository.set(guild);
        }

        // 길드가 없다면 에러
        if (!guild)
            throw new Error("[SendVoiceProfileMessageUseCase] 예상하지 못 한 에러");

        // 활성화된 게임을 가지고 옵니다.
        const enabledGames = guild.getEnabledGames();

        // 활성화된 게임 중에 유저 닉네임을 가지고 옵니다.
        const nicknameGroups = user.getNicknamesByGameTypes(enabledGames);

        if (nicknameGroups.length === 0)
            return;

        return {
            ok: true,
            profiles: nicknameGroups,
        }
    }

}

module.exports = SendVoiceProfileMessageUseCase;