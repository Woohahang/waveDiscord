const GAME_TYPES = require('@constants/gameTypes');

//
const DEFAULT_MAX_NICKNAME_COUNT = 5;

const MAX_NICKNAME_COUNT_BY_GAME = {
    [GAME_TYPES.STEAM]: 1,
    [GAME_TYPES.LEAGUE_OF_LEGENDS]: 5,
    [GAME_TYPES.VALORANT]: 5,
};

/**
 * 게임별 기본 닉네임 구조 생성
 */
function createEmptyGames() {
    return {
        [GAME_TYPES.STEAM]: [],
        [GAME_TYPES.LEAGUE_OF_LEGENDS]: [],
        [GAME_TYPES.TEAMFIGHT_TACTICS]: [],
        [GAME_TYPES.VALORANT]: [],
        [GAME_TYPES.STEAM_BATTLEGROUNDS]: [],
        [GAME_TYPES.KAKAO_BATTLEGROUNDS]: [],
        [GAME_TYPES.RAINBOW_SIX]: [],
        [GAME_TYPES.BLIZZARD]: [],
        [GAME_TYPES.OVERWATCH_2]: [],
        [GAME_TYPES.LOST_ARK]: []
    };
}

// 게임에 따라 등록할 수 있는 닉네임 갯수를 가지고 옵니다.
function getMaxNicknameCount(gameType) {
    return MAX_NICKNAME_COUNT_BY_GAME[gameType] ?? DEFAULT_MAX_NICKNAME_COUNT;
}

// 닉네임 중복 검사
function isDuplicateNickname(gameType, entries, nicknameEntry) {
    if (gameType === GAME_TYPES.STEAM)
        return entries.some(entry => entry.profileLink === nicknameEntry.profileLink);

    return entries.some(entry => entry.nickname === nicknameEntry.nickname);
}

class User {

    constructor({ userId, games = createEmptyGames() }) {
        this.userId = userId
        this.games = games
    }

    /**
     * 유저가 존재하지 않을 때 사용할 빈 User 생성
    */
    static createEmpty(userId) {
        return new User({
            userId,
            games: createEmptyGames()
        });
    }

    /**
     * 게임 닉네임을 저장합니다.
     *
     * @param {string} gameType
     * @param {string} nickname
    */
    addNickname(gameType, nicknameEntry) {
        const entries = this.games[gameType] ?? [];

        const maxCount = getMaxNicknameCount(gameType);

        // 닉네임 등록 갯수 검사
        if (entries.length >= maxCount)
            return "NICKNAME_SAVE_LIMIT_EXCEEDED";

        // 닉네임 중복 검사
        if (isDuplicateNickname(gameType, entries, nicknameEntry))
            return "NICKNAME_SAVE_DUPLICATE";

        entries.push(nicknameEntry);
        this.games[gameType] = entries;

        return "NICKNAME_SAVE_SUCCESS";  // SAVE_NICKNAME_SUCCESS
    }

    /**
     * 지정된 게임 닉네임들을 제거합니다.
     * 
     *  * 예시 입력:
     * [
     *   { gameType: 'leagueOfLegends', nickname: '끼매누#kr1' }
     *   { gameType: 'valorant', nickname: '우당탕탕#우하항' },
     * ]
     * 
     * 처리 방식:
     * - gameType에 해당하는 닉네임 목록에서
     * - nickname이 동일한 엔트리를 필터링하여 제거합니다.
     * 
     * @param {Array<{ gameType: string, nickname: string }>} nicknamesToRemove
     * @returns {string} 닉네임 삭제 성공 상태 키
    */
    removeNicknames(nicknamesToRemove) {
        for (const { gameType, nickname } of nicknamesToRemove)
            this.games[gameType] = this.games[gameType].
                filter(entry => entry.nickname !== nickname);

        return "NICKNAME_DELETE_SUCCESS";
    }

}

module.exports = User;