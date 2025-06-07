const LeagueOfLegendsDto = require("./games/LeagueOfLegendsDto");
const SteamDto = require("./games/SteamDto");

/**
 * 유저 프로필 DTO 클래스
 * 
 * - 유저가 등록한 다양한 게임 닉네임 정보를 통합적으로 관리
 */
class UserProfileDto {

    /**
     * @param {Object} userDoc - Mongoose 유저 문서
     */
    constructor(userDoc) {

        this.exists = Boolean(userDoc); // 존재 여부
        if (!userDoc) return;

        const doc = userDoc.toObject();

        this.userId = doc.userId;
        this.createdAt = doc.createdAt;
        this.updatedAt = doc.updatedAt;

        this.leagueOfLegends = new LeagueOfLegendsDto(doc.leagueOfLegends || []);
        this.steam = new SteamDto(doc.steam || []);

        this.teamfightTactics = doc.teamfightTactics || [];
        this.valorant = doc.valorant || [];
        this.steamBattleGrounds = doc.steamBattleGrounds || [];
        this.kakaoBattleGrounds = doc.kakaoBattleGrounds || [];
        this.rainbowSix = doc.rainbowSix || [];
        this.blizzard = doc.blizzard || [];
        this.overWatchTwo = doc.overWatchTwo || [];
        this.lostArk = doc.lostArk || [];
    }

    /**
     * 해당 게임 타입에 닉네임이 존재하는지 확인
     * @param {string} gameType
     * @returns {boolean}
    */
    hasNickname(gameType) {
        const data = this[gameType];
        if (!data) return false;

        if (typeof data.hasNickname === 'function') {
            return data.hasNickname(); // SteamDto, LeagueOfLegendsDto 등
        }

        return Array.isArray(data) && data.length > 0;
    }

    /**
     * 해당 게임 타입에 등록된 닉네임 리스트를 반환
     * @param {string} gameType
     * @returns {string[]}
    */
    getNicknameList(gameType) {
        const data = this[gameType];
        if (!data) return [];

        if (typeof data.getNicknames === 'function') {
            return data.getNicknames(); // SteamDto, LeagueOfLegendsDto 등
        }

        return Array.isArray(data) ? data : [];
    }

    getAllNicknames() {
        const allNicknames = {};
        for (const key of Object.keys(this)) {
            if (typeof this[key] === 'function') continue;

            const list = this.getNicknameList(key);
            if (list.length > 0) {
                allNicknames[key] = list;
            }
        }
        return allNicknames;
    }

}

module.exports = UserProfileDto;