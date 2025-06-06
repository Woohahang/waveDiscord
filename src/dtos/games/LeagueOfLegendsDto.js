class LeagueOfLegendsDto {
    constructor(entries = []) {
        this.entries = entries.map(entry => ({
            nickname: entry.nickname,
            tier: entry.tier,
            rank: entry.rank,
            leaguePoints: entry.leaguePoints
        }));
    }

    hasNickname() {
        return this.entries.some(entry => !!entry.nickname?.trim());
    }

    getNicknames() {
        return this.entries.map(entry => entry.nickname);
    }

}

module.exports = LeagueOfLegendsDto;