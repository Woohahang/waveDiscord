const guildModel = require("../models/guildModel");
const GuildMapper = require('../mappers/guildMapper');
const GuildRepository = require("@domain/guild/repositories/guildRepository");
const Guild = require('@domain/guild/entities/guild');

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

        return GuildMapper.toDomain(document);
    }

    /**
     * 길드 엔티티를 저장합니다.
     *
     * @param {Guild} guild
     * @returns {Promise<void>}
     */
    async save(guild) {
        const data = GuildMapper.toPersistence(guild);

        await guildModel.updateOne(
            { guildId: guild.guildId },
            { $set: data },
            { upsert: true }
        );
    }

}

module.exports = MongoGuildRepository;