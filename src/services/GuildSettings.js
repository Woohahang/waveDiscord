const ERROR_KEY = require('@constants/errorKeys');
const logger = require('@utils/logger');
const STATE_KEYS = require('@constants/stateKeys');
const GuildCacheManager = require('./GuildCacheManager');
const guildRepository = require('../repositories/guildRepository');

class GuildSettings {
    // 모든 길드 데이터를 저장하는 정적 객체입니다.
    static GUILD_MAPS = {};
    static MAX_CACHE_SIZE = 100; // 캐시 최대입니다.

    constructor(guildId) {
        this.guildId = guildId;
    };

    // 길드에 초대 되면 길드 데이터를 생성합니다.
    async loadOrCreate() {
        try {
            // 캐시에서 길드 데이터를 가져옵니다.
            let guildData = GuildCacheManager.get(this.guildId);

            if (!guildData) {
                // 데이터베이스에서 길드 데이터를 확인합니다.
                guildData = await guildRepository.findGuildById(this.guildId);

                if (!guildData) // 길드 데이터가 존재하지 않으면 새로 생성합니다.
                    guildData = await guildRepository.createGuild(this.guildId);

                // 길드 데이터를 캐시에 저장합니다.
                GuildCacheManager.set(this.guildId, guildData);
            };

            // 길드 데이터를 반환합니다.
            return guildData;

        } catch (error) {
            logger.error('[GuildSettings.loadOrCreate] 길드 데이터를 불러오는 중 DB 오류', {
                guildId: this.guildId,
                errorMessage: error.message
            })
            return null;
        };
    };


    async saveChannelId(channelType, channelId) {
        try {
            // 캐시에서 길드 데이터를 로드 하거나 데이터 베이스에서 로드합니다.
            let guildData = await this.loadOrCreate();

            // 채널 타입에 따라 채널 id를 저장합니다.
            switch (channelType) {
                case 'adminChannel':
                    guildData.adminChannelId = channelId;
                    break;
                case 'mainChannel':
                    guildData.mainChannelId = channelId;
                    break;
                default:
                    throw new Error('유효하지 않은 채널 타입입니다.');
            };

            await guildRepository.saveGuildData(guildData);

            GuildCacheManager.set(this.guildId, guildData);

        } catch (error) {
            logger.error('[GuildSettings.saveChannelId] 채널 업데이트 중 DB 오류', {
                guildId: this.guildId,
                channelType,
                channelId,
                errorMessage: error.message
            })
        };
    };

    async updateBasicInfo(ownerData) {
        try {
            // 캐시에서 길드 데이터를 로드 하거나 데이터 베이스에서 로드합니다.
            let guildData = await this.loadOrCreate();

            // ownerData에서 오너 ID와 길드 이름을 가져옵니다.
            const { guildName, ownerId } = ownerData;

            // 길드 데이터에 오너 ID와 길드 이름을 저장합니다.
            guildData.ownerId = ownerId;
            guildData.guildName = guildName;

            // 변경된 길드 데이터를 데이터베이스 및 캐시에 저장합니다.
            await guildRepository.saveGuildData(guildData);
            GuildCacheManager.set(this.guildId, guildData);

        } catch (error) {
            logger.error('[GuildSettings.updateBasicInfo] 서버 주인 업데이트 중 DB 오류', {
                guildId: this.guildId,
                ownerData,
                errorMessage: error.message
            })

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
            const guildData = await this.loadOrCreate();

            gameKeys.forEach(key => {
                guildData[key] = isVisible;
            });

            await guildRepository.saveGuildData(guildData);
            GuildCacheManager.set(this.guildId, guildData);

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