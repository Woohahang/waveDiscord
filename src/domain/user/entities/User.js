const GAME_TYPES = require('@constants/gameTypes');
const USER_RESULT_CODES = require('../constants/userResultCodes');

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
            return {
                ok: false,
                code: USER_RESULT_CODES.NICKNAME_SAVE_LIMIT_EXCEEDED,
            };

        // 닉네임 중복 검사
        if (isDuplicateNickname(gameType, entries, nicknameEntry))
            return {
                ok: false,
                code: USER_RESULT_CODES.NICKNAME_SAVE_DUPLICATE,
            };

        entries.push(nicknameEntry);
        this.games[gameType] = entries;

        return {
            ok: true,
            code: USER_RESULT_CODES.NICKNAME_SAVE_SUCCESS,
        };
    }

    /**
     * 전달된 게임 목록 중,
     * 유저가 등록한 닉네임이 있는 게임만 반환합니다.
     *
     * @param {string[]} gameTypes
     * @returns {Array<{ gameType: string, entries: Array }>}
    */
    getNicknamesByGameTypes(gameTypes) {
        return gameTypes
            .map(gameType => ({
                gameType,
                entries: this.games[gameType] ?? [],
            }))
            .filter(({ entries }) => entries.length > 0);
    }

    getAllNicknames() {
        return Object.entries(this.games).flatMap(([gameType, entries]) =>
            entries.map(({ entryId, nickname }) => ({
                entryId,
                gameType,
                nickname,
            }))
        );
    }

    removeNicknamesByEntryIds(nicknameEntryIds) {
        this.games = Object.fromEntries(
            Object.entries(this.games).map(([gameType, entries]) => [
                gameType,
                entries.filter(entry => !nicknameEntryIds.includes(entry.entryId))
            ])
        );

        return {
            ok: true,
            code: USER_RESULT_CODES.NICKNAME_DELETE_SUCCESS,
        };
    }

}

module.exports = User;