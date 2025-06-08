const { GAME_TYPES } = require("@constants/gameTypes");
const userRepository = require("@repositories/userRepository");

class TierService {

    constructor(guildId, gameType) {
        this.guildId = guildId;
        this.gameType = gameType;
    }

    async fetchTierUsers(memberIds) {
        switch (this.gameType) {
            case GAME_TYPES.LEAGUE_OF_LEGENDS:
                return await userRepository.findUsersWithLoLTierByIds(memberIds);
            default:
                throw new Error(`[TierService.fetchTierUsers] Unknown gameType: ${this.game}`);
        }
    }

}

module.exports = TierService;