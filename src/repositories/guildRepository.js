const logger = require('@utils/logger');
const guildSchema = require('../mongoDB/guildSettingsSchema');

class GuildRepository {

    async findGuildById(guildId) {
        try {
            return guildSchema.findOne({ guildId });
        } catch (error) {
            logger.error('[GuildRepository.findGuildById] 길드 조회 실패', {
                errorMessage: error.message,
                guildId
            });
            throw error;
        }
    }

    async createGuild(guildId) {
        try {
            const newGuild = new guildSchema({ guildId });
            return await newGuild.save();
        } catch (error) {
            logger.error('[GuildRepository.createGuild] 길드 생성 실패', {
                errorMessage: error.message,
                guildId
            });
            throw error;
        }
    }

    async saveGuildData(guildData) {
        try {
            return await guildData.save();
        } catch (error) {
            logger.error('[GuildRepository.saveGuildData] 길드 데이터 저장 실패', {
                errorMessage: error.message,
                guildData
            });
            throw error;
        }
    }

}

module.exports = new GuildRepository();