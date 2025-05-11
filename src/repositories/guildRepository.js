const guildSchema = require('../mongoDB/guildSettingsSchema');

class GuildRepository {

    static async findDuplicateGuildIds() {
        const duplicates = await guildSchema.aggregate([
            {
                $group: {
                    _id: '$guildId',
                    count: { $sum: 1 },
                    docs: { $push: '$_id' }
                }
            },
            {
                $match: {
                    count: { $gt: 1 }
                }
            }
        ]);
        return duplicates;
    }

    async findGuildById(guildId) {
        return guildSchema.findOne({ guildId });
    }

    async createGuild(guildId) {
        const newGuild = new guildSchema({ guildId });
        return await newGuild.save();
    }

    async saveGuildData(guildData) {
        return await guildData.save();
    }

}

module.exports = new GuildRepository();