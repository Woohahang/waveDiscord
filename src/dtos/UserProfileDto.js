const LeagueOfLegendsDto = require("./games/LeagueOfLegendsDto");
const SteamDto = require("./games/SteamDto");

class UserProfileDto {

    /**
     * @param {Object} userDoc - Mongoose 유저 문서
     */
    constructor(userDoc) {

        this.exists = !!userDoc; // 존재 여부
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
}

module.exports = UserProfileDto;