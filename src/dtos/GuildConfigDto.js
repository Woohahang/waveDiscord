const { GAME_TYPES } = require("@constants/gameTypes");

class GuildConfigDto {
    constructor(doc) {
        const data = doc.toObject?.() || doc;

        this.guildId = data.guildId;
        this.guildName = data.guildName;
        this.ownerId = data.ownerId;
        this.ownerUsername = data.ownerUsername;
        this.mainChannelId = data.mainChannelId;
        this.adminChannelId = data.adminChannelId;

        this.games = {};
        for (const key of Object.keys(GAME_TYPES)) {
            const gameKey = GAME_TYPES[key];
            this.games[gameKey] = Boolean(data[gameKey]);
        }
    }

    getEnabledGames() {
        return Object.entries(this.games)
            .filter(([, enabled]) => enabled)
            .map(([game]) => game);
    }

    getDisabledGames() {
        return Object.entries(this.games)
            .filter(([, enabled]) => !enabled)
            .map(([game]) => game);
    }

}

module.exports = GuildConfigDto;