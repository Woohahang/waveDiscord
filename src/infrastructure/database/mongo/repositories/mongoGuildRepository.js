const GAME_TYPES = require("@constants/gameTypes");
const guildModel = require("../models/guildModel");
const GuildRepository = require("../../../../domain/guild/repositories/GuildRepository");
const Guild = require('../../../../domain/guild/entities/guild');

class MongoGuildRepository extends GuildRepository {
    /**
     * 길드 ID로 길드를 조회합니다.
     *
     * @param {string} guildId
     * @returns {Promise<Guild|null>}
     */
    async findById(guildId) {
        const document = await guildModel.findOne({ guildId });

        if (!document) return null;

        return this.toEntity(document);
    }

    /**
     * 길드 엔티티를 저장합니다.
     *
     * @param {Guild} guild
     * @returns {Promise<void>}
     */
    async save(guild) {
        const document = this.toDocument(guild);

        await guildModel.updateOne(
            { guildId: guild.guildId },
            { $set: document },
            { upsert: true }
        );
    }

    /**
     * Mongo 문서를 Guild 엔티티로 변환합니다.
     *
     * @param {Object} document
     * @returns {Guild}
     */
    toEntity(document) {
        return new Guild({
            guildId: document.guildId,
            guildName: document.guildName,
            ownerId: document.ownerId,
            ownerUsername: document.ownerUsername,
            mainChannelId: document.mainChannelId,
            adminChannelId: document.adminChannelId,
            games: {
                [GAME_TYPES.STEAM]: document[GAME_TYPES.STEAM] ?? false,
                [GAME_TYPES.LEAGUE_OF_LEGENDS]:
                    document[GAME_TYPES.LEAGUE_OF_LEGENDS] ?? false,
                [GAME_TYPES.TEAMFIGHT_TACTICS]:
                    document[GAME_TYPES.TEAMFIGHT_TACTICS] ?? false,
                [GAME_TYPES.VALORANT]:
                    document[GAME_TYPES.VALORANT] ?? false,
                [GAME_TYPES.STEAM_BATTLEGROUNDS]:
                    document[GAME_TYPES.STEAM_BATTLEGROUNDS] ?? false,
                [GAME_TYPES.KAKAO_BATTLEGROUNDS]:
                    document[GAME_TYPES.KAKAO_BATTLEGROUNDS] ?? false,
                [GAME_TYPES.RAINBOW_SIX]:
                    document[GAME_TYPES.RAINBOW_SIX] ?? false,
                [GAME_TYPES.BLIZZARD]:
                    document[GAME_TYPES.BLIZZARD] ?? false,
                [GAME_TYPES.OVERWATCH_2]:
                    document[GAME_TYPES.OVERWATCH_2] ?? false,
                [GAME_TYPES.LOST_ARK]:
                    document[GAME_TYPES.LOST_ARK] ?? false,
            },
        });
    }

    /**
     * Guild 엔티티를 Mongo 저장용 객체로 변환합니다.
     *
     * @param {Guild} guild
     * @returns {Object}
     */
    toDocument(guild) {
        return {
            guildId: guild.guildId,
            guildName: guild.guildName,
            ownerId: guild.ownerId,
            ownerUsername: guild.ownerUsername,
            mainChannelId: guild.mainChannelId,
            adminChannelId: guild.adminChannelId,
            [GAME_TYPES.STEAM]: guild.games[GAME_TYPES.STEAM],
            [GAME_TYPES.LEAGUE_OF_LEGENDS]:
                guild.games[GAME_TYPES.LEAGUE_OF_LEGENDS],
            [GAME_TYPES.TEAMFIGHT_TACTICS]:
                guild.games[GAME_TYPES.TEAMFIGHT_TACTICS],
            [GAME_TYPES.VALORANT]: guild.games[GAME_TYPES.VALORANT],
            [GAME_TYPES.STEAM_BATTLEGROUNDS]:
                guild.games[GAME_TYPES.STEAM_BATTLEGROUNDS],
            [GAME_TYPES.KAKAO_BATTLEGROUNDS]:
                guild.games[GAME_TYPES.KAKAO_BATTLEGROUNDS],
            [GAME_TYPES.RAINBOW_SIX]: guild.games[GAME_TYPES.RAINBOW_SIX],
            [GAME_TYPES.BLIZZARD]: guild.games[GAME_TYPES.BLIZZARD],
            [GAME_TYPES.OVERWATCH_2]: guild.games[GAME_TYPES.OVERWATCH_2],
            [GAME_TYPES.LOST_ARK]: guild.games[GAME_TYPES.LOST_ARK],
        };
    }
}

module.exports = MongoGuildRepository;