const ERROR_KEY = require('@constants/errorKeys');
const guildSchema = require('../mongoDB/guildSettingsSchema');
const logger = require('@utils/logger');
const STATE_KEYS = require('@constants/stateKeys');

class GuildSettings {
    // 모든 길드 데이터를 저장하는 정적 객체입니다.
    static GUILD_MAPS = {};
    static MAX_CACHE_SIZE = 100; // 캐시 최대입니다.

    constructor(guildId) {
        this.guildId = guildId;
    };

    // 캐시된 길드 데이터를 가져오는 비공개 메서드입니다.
    #getCachedGuildData() {
        const cachedData = GuildSettings.GUILD_MAPS[this.guildId];
        if (cachedData) {
            cachedData.timestamp = Date.now(); // 접근 시 타임스탬프를 갱신합니다.
            return cachedData.data;
        };
        return null;
    };

    // 길드 데이터를 캐시에 저장하는 비공개 메서드입니다.
    #cacheGuildData(guildData) {
        GuildSettings.GUILD_MAPS[this.guildId] = {
            data: guildData,
            timestamp: Date.now()
        };

        this.#checkCacheSize();
    };

    // 캐시의 크기를 확인하고, 초과 시 오래된 항목을 제거합니다.
    #checkCacheSize() {
        const keys = Object.keys(GuildSettings.GUILD_MAPS);
        if (keys.length > GuildSettings.MAX_CACHE_SIZE) {
            // 타임스탬프를 기준으로 정렬하여 오래된 항목을 찾습니다.
            keys.sort((a, b) => GuildSettings.GUILD_MAPS[a].timestamp - GuildSettings.GUILD_MAPS[b].timestamp);
            const oldestKey = keys[0];
            delete GuildSettings.GUILD_MAPS[oldestKey];
        };
    };

    /**
     * guildId가 중복으로 저장된 문서를 찾습니다.
     */
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

        if (duplicates.length === 0) {
            console.log('중복된 guildId는 없습니다.');
        } else {
            console.log('중복된 guildId 목록:');
            duplicates.forEach(d => {
                console.log(`- guildId: ${d._id} (총 ${d.count}개) | _id 목록: ${d.docs.join(', ')}`);
            });
        }
    }

    // 길드에 초대 되면 길드 데이터를 생성합니다.
    async loadOrCreate() {
        try {
            // 캐시에서 길드 데이터를 가져옵니다.
            let guildData = this.#getCachedGuildData();

            if (!guildData) {
                // 데이터베이스에서 길드 데이터를 확인합니다.
                guildData = await guildSchema.findOne({ guildId: this.guildId });

                if (!guildData) {
                    // 길드 데이터가 존재하지 않으면 새로 생성합니다.
                    const newGuild = new guildSchema({ guildId: this.guildId });
                    await newGuild.save();
                    guildData = newGuild;
                };

                // 길드 데이터를 캐시에 저장합니다.
                this.#cacheGuildData(guildData);
            };

            // 길드 데이터를 반환합니다.
            return guildData;

        } catch (error) {
            console.error('GuildSettings.#loadOrCreate() 예외 : ', error);
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

            await guildData.save();
            // 길드 데이터를 캐시에 저장합니다.
            this.#cacheGuildData(guildData);

        } catch (error) {
            console.error('GuildSettings.saveChannelId() 예외 : ', error);
        };
    };


    async saveAliasPatterns(getState) {
        try {
            // 캐시에서 길드 데이터를 로드 하거나 데이터 베이스에서 로드합니다.
            let guildData = await this.loadOrCreate();

            const { aliasPatterns, aliasSeparator, aliasRoleId } = getState;

            // 값이 비어 있다면 에러를 반환합니다.
            if (!aliasPatterns || !aliasSeparator || !aliasRoleId) {
                throw new Error('별칭 패턴, 구분 기호, 역할 ID는 비워둘 수 없습니다.');
            };

            // 길드 별명 패턴과 부여 받을 역할 id를 길드 데이터에 저장합니다.
            guildData.aliasPatterns = aliasPatterns;
            guildData.aliasSeparator = aliasSeparator;
            guildData.aliasRoleId = aliasRoleId;

            // 변경된 길드 데이터를 데이터베이스 및 캐시에 저장합니다.
            await guildData.save();
            this.#cacheGuildData(guildData);

        } catch (error) {
            console.error('GuildSettings.saveAliasPatterns() 예외 : ', error);
            throw error;
        };
    };

    async saveGuildOwnerData(ownerData) {
        try {
            // 캐시에서 길드 데이터를 로드 하거나 데이터 베이스에서 로드합니다.
            let guildData = await this.loadOrCreate();

            // ownerData에서 오너 ID와 길드 이름을 가져옵니다.
            const { guildName, ownerId } = ownerData;

            // 길드 데이터에 오너 ID와 길드 이름을 저장합니다.
            guildData.ownerId = ownerId;
            guildData.guildName = guildName;

            // 변경된 길드 데이터를 데이터베이스 및 캐시에 저장합니다.
            await guildData.save();
            this.#cacheGuildData(guildData);

        } catch (error) {
            console.error('GuildSettings.saveGuildOwnerData() 예외 : ', error);
            throw error;
        };
    };

    /**
    * 게임 표시 여부를 저장합니다.
    * 
    * @param {string[]} gameKeys 게임 키 배열 (예: ['leagueOfLegends', 'valorant'])
    * @param {boolean} isVisible 표시 여부
    * @returns {{ updatedGuildData: object | null, resultKey: string }} 저장 결과 객체
    * - updatedGuildData: 저장된 guildData 객체 (실패 시 null)
    * - resultKey: 상태 키 (예: STATE_KEYS.GUILD_UPDATE_SUCCESS, ERROR_KEY.GUILD_UPDATE_FAILED)
    */
    async saveGameVisibility(isVisible, gameKeys) {
        try {
            const guildData = await this.loadOrCreate();

            gameKeys.forEach(key => {
                guildData[key] = isVisible;
            });

            await guildData.save();
            this.#cacheGuildData(guildData);

            return { updatedGuildData: guildData, resultKey: STATE_KEYS.GUILD_UPDATE_SUCCESS };

        } catch (error) {
            logger.error('[GuildSettings.saveGameVisibility] 게임 표시 여부 저장 중 DB 처리 실패', {
                guildId: this.guildId,
                isVisible,
                gameKeys,
                errorMessage: error.message
            });

            return { updatedGuildData: null, resultKey: ERROR_KEY.GUILD_UPDATE_FAILED };
        }
    }

};

module.exports = GuildSettings;