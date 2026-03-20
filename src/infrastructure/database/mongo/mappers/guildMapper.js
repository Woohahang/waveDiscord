const Guild = require('@domain/guild/entities/guild');

class GuildMapper {
    static toDomain(doc) {
        if (!doc) return null;

        return new Guild({
            guildId: doc.guildId,
            guildName: doc.guildName,
            ownerId: doc.ownerId,
            ownerUsername: doc.ownerUsername,
            mainChannelId: doc.mainChannelId,
            adminChannelId: doc.adminChannelId,
            games: doc.games,
        });
    }

    static toPersistence(guild) {
        return {
            guildId: guild.guildId,
            guildName: guild.guildName,
            ownerId: guild.ownerId,
            ownerUsername: guild.ownerUsername,
            mainChannelId: guild.mainChannelId,
            adminChannelId: guild.adminChannelId,
            games: guild.games,
        };
    }
}

module.exports = GuildMapper;