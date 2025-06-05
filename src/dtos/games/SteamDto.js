class SteamDto {
    constructor(entries = []) {
        this.entries = entries.map(entry => ({
            nickname: entry.nickname,
            profileLink: entry.profileLink
        }));
    }
}

module.exports = SteamDto;