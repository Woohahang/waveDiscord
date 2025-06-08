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

    async saveGuildDoc(guildDoc) {
        try {
            return await guildDoc.save();
        } catch (error) {
            logger.error('[GuildRepository.saveGuildData] 길드 데이터 저장 실패', {
                errorMessage: error.message,
                guildDoc
            });
            throw error;
        }
    }

    async updateBasicInfo(guildId, { guildName, ownerId, ownerUsername }) {
        try {
            const guildDoc = await guildSchema.findOneAndUpdate(
                { guildId },
                {
                    $set: {
                        guildName,
                        ownerId,
                        ownerUsername
                    }
                },
                { new: true, upsert: true }
            );
            return guildDoc;
        } catch (error) {
            logger.error('[GuildRepository.updateBasicInfo] 길드 기본 정보 업데이트 실패', {
                guildId,
                errorMessage: error.message
            });
            throw error;
        }
    }

    async updateChannelId(guildId, channelType, channelId) {
        try {
            return await guildSchema.findOneAndUpdate(
                { guildId },
                { $set: { [channelType]: channelId } },
                { new: true }
            );
        } catch (error) {
            logger.error('[GuildRepository.updateChannelId] 채널 ID 업데이트 실패', {
                errorMessage: error.message,
                guildId,
                channelType,
                channelId
            });
            throw error;
        }
    }

    async updateGameVisibility(guildId, gameKeys, isVisible) {
        try {
            const update = {};
            gameKeys.forEach(key => {
                update[key] = isVisible;
            });

            return await guildSchema.findOneAndUpdate(
                { guildId },
                { $set: update },
                { new: true, upsert: true } // 필요하다면 upsert 옵션
            );
        } catch (error) {
            logger.error('[GuildRepository.updateGameVisibility] 게임 가시성 업데이트 실패', {
                guildId,
                gameKeys,
                isVisible,
                errorMessage: error.message
            });
            throw error;
        }
    }


}

module.exports = new GuildRepository();