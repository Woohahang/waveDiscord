class LeagueOfLegendsDto {
    constructor(entries = []) {
        this.entries = entries.map(entry => ({
            nickname: entry.nickname,
            tier: entry.tier,
            rank: entry.rank,
            leaguePoints: entry.leaguePoints
        }));
    }
}

module.exports = LeagueOfLegendsDto;