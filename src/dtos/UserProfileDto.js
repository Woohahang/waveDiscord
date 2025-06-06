const LeagueOfLegendsDto = require("./games/LeagueOfLegendsDto");
const SteamDto = require("./games/SteamDto");

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

    hasNickname(gameType) {
        const data = this[gameType];
        if (!data) return false;

        if (typeof data.hasNickname === 'function') {
            return data.hasNickname(); // SteamDto, LeagueOfLegendsDto 등
        }

        return Array.isArray(data) && data.length > 0;
    }

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