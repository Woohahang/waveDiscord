// domain/voice/services/VoiceProfileService.js

/**
 * VoiceProfileService 의 책임
 * "이 유저의 프로필을 보여줘야 하는가?"
 * 
 * 유저 프로필 조회
 * 길드 설정 조회
 * 표시 가능한 게임 필터링
 * 프로필 표시 여부 판단
 * 를 판단하는 로직
 * 
*/
class VoiceProfileService {

    constructor(userRepository, guildRepository) {
        this.userRepository = userRepository
        this.guildRepository = guildRepository
    }

    /**
     * 유저의 음성 프로필 데이터를 조회한다.
     */
    async getVoiceProfileData({ guildId, userId }) {

        const user = await this.userRepository.findById(userId)
        if (!user)
            return null

        const guild = await this.guildRepository.findById(guildId)
        if (!guild)
            return null

        const availableGames = this.filterAvailableGames(
            guild.enabledGames,
            user.nicknames
        )

        if (availableGames.length === 0)
            return null

        return {
            userId,
            nicknames: user.nicknames,
            games: availableGames
        }
    }

    /**
     * 길드에서 허용된 게임 중
     * 유저가 닉네임을 등록한 게임만 필터링
     */
    filterAvailableGames(enabledGames, userNicknames) {

        return enabledGames.filter(game =>
            userNicknames[game]
        )
    }

}

module.exports = VoiceProfileService