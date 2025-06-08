const logger = require('@utils/logger');
const GuildCacheManager = require('./GuildCacheManager');
const guildRepository = require('../repositories/guildRepository');
const GuildConfigDto = require('@dtos/GuildConfigDto');
const { VALID_CHANNEL_TYPES } = require('@constants/guild');
const { VALID_GAME_KEYS } = require('@constants/gameTypes');

class GuildSettings {
    constructor(guildId) {
        this.guildId = guildId;
    };

    async getConfig() {
        try {
            const cachedData = GuildCacheManager.get(this.guildId);
            if (cachedData) return cachedData;

            const guildDoc = await this.loadOrCreate();
            const guildConfig = new GuildConfigDto(guildDoc);
            GuildCacheManager.set(this.guildId, guildConfig);

            return guildConfig;
        } catch (error) {
            logger.error('[GuildSettings.getConfig] 길드 설정 데이터 불러오는 중 오류', {
                guildId: this.guildId,
                errorMessage: error.message
            })
            throw error;
        }
    }

    async createDoc() {
        try {
            return await guildRepository.createGuild(this.guildId);
        } catch (error) {
            logger.error('[GuildSettings.createDoc] 길드 문서 생성 중 오류', {
                guildId: this.guildId,
                errorMessage: error.message
            })
            throw error;
        }
    }

    async loadDoc() {
        try {
            return await guildRepository.findGuildById(this.guildId);
        } catch (error) {
            logger.error('[GuildSettings.loadDoc] 길드 문서 로드 실패', {
                guildId: this.guildId,
                errorMessage: error.message,
            });
            throw error;
        }
    }


    // 길드에 초대 되면 길드 데이터를 생성합니다.
    async loadOrCreate() {
        try {
            let guildDoc = await this.loadDoc();

            if (!guildDoc) {
                guildDoc = await this.createDoc();
            }

            return guildDoc;
        } catch (error) {
            logger.error('[GuildSettings.loadOrCreate] 길드 문서 불러오기 또는 생성 오류', {
                guildId: this.guildId,
                errorMessage: error.message
            });
            throw error;
        };
    };

    async saveChannelId(channelType, channelId) {
        try {
            if (!VALID_CHANNEL_TYPES.includes(channelType))
                throw new Error(`유효하지 않은 채널 타입: "${channelType}"`);

            const updatedDoc = await guildRepository.updateChannelId(this.guildId, channelType, channelId);

            const guildConfig = new GuildConfigDto(updatedDoc);
            GuildCacheManager.set(this.guildId, guildConfig);
        } catch (error) {
            logger.error('[GuildSettings.saveChannelId] 채널 업데이트 중 DB 오류', {
                guildId: this.guildId,
                channelType,
                channelId,
                errorMessage: error.message
            });
            throw error;
        };
    };

    async updateBasicInfo(guildMeta) {
        try {
            const updatedDoc = await guildRepository.updateBasicInfo(this.guildId, guildMeta);
            const guildConfig = new GuildConfigDto(updatedDoc);
            GuildCacheManager.set(this.guildId, guildConfig);
        } catch (error) {
            logger.error('[GuildSettings.updateBasicInfo] 서버 주인 업데이트 중 DB 오류', {
                guildId: this.guildId,
                ownerData,
                errorMessage: error.message
            });
            throw error;
        };
    };

    /**
    * 게임 표시 여부를 저장합니다.
    * 
    * @param {string[]} gameKeys 게임 키 배열 (예: ['leagueOfLegends', 'valorant'])
    * @param {boolean} isVisible 표시 여부
    */
    async saveGameVisibility(isVisible, gameKeys) {
        try {
            // 유효성 검사
            const invalidKeys = gameKeys.filter(key => !VALID_GAME_KEYS.includes(key));
            if (invalidKeys.length > 0) {
                throw new Error(`유효하지 않은 게임 키: "${invalidKeys.join(', ')}"`);
            }

            // 업데이트
            const updatedDoc = await guildRepository.updateGameVisibility(this.guildId, gameKeys, isVisible);

            // 캐시 저장
            const guildConfig = new GuildConfigDto(updatedDoc);
            GuildCacheManager.set(this.guildId, guildConfig);
        } catch (error) {
            logger.error('[GuildSettings.saveGameVisibility] 게임 표시 여부 저장 중 DB 처리 실패', {
                guildId: this.guildId,
                isVisible,
                gameKeys,
                errorMessage: error.message
            });
            throw error;
        }
    }

};

module.exports = GuildSettings;