const GAME_TYPES = require("@constants/gameTypes");

function createGamesState(games = {}) {
    return {
        [GAME_TYPES.STEAM]: games[GAME_TYPES.STEAM] ?? false,
        [GAME_TYPES.LEAGUE_OF_LEGENDS]: games[GAME_TYPES.LEAGUE_OF_LEGENDS] ?? false,
        [GAME_TYPES.TEAMFIGHT_TACTICS]: games[GAME_TYPES.TEAMFIGHT_TACTICS] ?? false,
        [GAME_TYPES.VALORANT]: games[GAME_TYPES.VALORANT] ?? false,
        [GAME_TYPES.STEAM_BATTLEGROUNDS]: games[GAME_TYPES.STEAM_BATTLEGROUNDS] ?? false,
        [GAME_TYPES.KAKAO_BATTLEGROUNDS]: games[GAME_TYPES.KAKAO_BATTLEGROUNDS] ?? false,
        [GAME_TYPES.RAINBOW_SIX]: games[GAME_TYPES.RAINBOW_SIX] ?? false,
        [GAME_TYPES.BLIZZARD]: games[GAME_TYPES.BLIZZARD] ?? false,
        [GAME_TYPES.OVERWATCH_2]: games[GAME_TYPES.OVERWATCH_2] ?? false,
        [GAME_TYPES.LOST_ARK]: games[GAME_TYPES.LOST_ARK] ?? false,
    };
}

function validateGameType(gameType) {
    const validGameTypes = Object.values(GAME_TYPES);

    if (!validGameTypes.includes(gameType)) {
        throw new Error(`[Guild] 유효하지 않은 gameType: ${gameType}`);
    }
}


/**
 * 길드(서버) 엔티티
 */
class Guild {

    constructor({
        guildId,
        guildName = "",
        ownerId = "",
        ownerUsername = "",
        mainChannelId = "",
        adminChannelId = "",
        games = {},
    }) {
        this.guildId = guildId;
        this.guildName = guildName;
        this.ownerId = ownerId;
        this.ownerUsername = ownerUsername;
        this.mainChannelId = mainChannelId;
        this.adminChannelId = adminChannelId;

        this.games = createGamesState(games);
    }

    /**
     * 비어 있는 길드 엔티티를 생성합니다.
     *
     * @param {string} guildId
     * @returns {Guild}
    */
    static createEmpty(guildId) {
        return new Guild({ guildId });
    }

    /**
     * 활성화된 게임 목록들을 가지고옵니다.
     * 
     * @returns {string[]}
    */
    getEnabledGames() {
        return this.#getGamesByEnabled(true);
    }

    /**
     * 비활성화된 게임 목록들을 가지고옵니다.
     * 
     * @returns {string[]}
    */
    getDisabledGames() {
        return this.#getGamesByEnabled(false);
    }

    /**
     * 메인 채널 ID를 설정합니다.
     *
     * @param {string} channelId
     */
    setMainChannelId(channelId) {
        this.mainChannelId = channelId;
    }

    /**
     * 관리자 채널 ID를 설정합니다.
     *
     * @param {string} channelId
     */
    setAdminChannelId(channelId) {
        this.adminChannelId = channelId;
    }

    /**
     * 게임 활성화 설정
     *
     * @param {string} gameType
    */
    enableGame(gameType) {
        validateGameType(gameType);
        this.games[gameType] = true;
    }

    /**
     * 게임 비활성화 설정
     *
     * @param {string} gameType
    */
    disableGame(gameType) {
        validateGameType(gameType);
        this.games[gameType] = false;
    }

    /**
     * 길드 기본 정보를 업데이트합니다.
     *
     * @param {Object} params
     * @param {string} [params.guildName]
     * @param {string} [params.ownerId]
     * @param {string} [params.ownerUsername]
     */
    updateInfo({ guildName, ownerId, ownerUsername }) {
        if (guildName !== undefined) this.guildName = guildName;
        if (ownerId !== undefined) this.ownerId = ownerId;
        if (ownerUsername !== undefined) this.ownerUsername = ownerUsername;
    }

    #getGamesByEnabled(enabled) {
        return Object.entries(this.games)
            .filter(([, value]) => value === enabled)
            .map(([gameType]) => gameType);
    }
}

module.exports = Guild;