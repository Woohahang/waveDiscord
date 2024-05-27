// GuildSettings.js

const guildSettingsSchema = require('../mongoDB/guildSettingsSchema');

class GuildSettings {
    constructor(guildId) {
        if (typeof guildId !== 'string' || guildId.trim() === '') {
            throw new Error('유효하지 않은 guildId입니다.');
        };

        // 싱글톤 패턴
        if (!GuildSettings.instances[guildId]) {
            this.guildId = guildId;
            this.guildData = null;
            GuildSettings.instances[guildId] = this;
            // 타이머 설정
            this.#resetTimer(guildId);
        } else {
            // 이미 인스턴스가 존재한다면 타이머만 리셋
            GuildSettings.instances[guildId].#resetTimer(guildId);
        };
        return GuildSettings.instances[guildId];
    };

    #resetTimer(guildId) {
        // 기존 타이머가 있다면 취소
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        // 새 타이머 설정
        this.timeout = setTimeout(() => {
            // 타이머가 완료되면 인스턴스 삭제
            if (GuildSettings.instances[guildId]) {
                delete GuildSettings.instances[guildId];
            } else {
                console.error('인스턴스 삭제 실패: 인스턴스가 이미 존재하지 않습니다.');
            }
        }, 3_600_000); // 한시간
    };

    async loadOrCreate() {
        try {
            // guildData가 이미 로드되어 있다면 즉시 반환
            if (this.guildData) {
                return this.guildData;
            }

            // MongoDB에서 guildId로 guildData 조회
            const guildData = await guildSettingsSchema.findOne({ guildId: this.guildId });

            // 데이터베이스에서 조회된 데이터가 있다면 메모리에 저장 후 반환
            if (guildData) {
                this.guildData = guildData;
                return this.guildData;
            }

            // 데이터베이스에 데이터가 없다면 새로 생성 후 저장
            this.guildData = new guildSettingsSchema({ guildId: this.guildId });
            await this.guildData.save();
            return this.guildData;

        } catch (error) {
            console.error('GuildSettings.js 의 loadOrCreate 에러 : ', error);
        };
    };


    async saveChannelId(channelType, channelId) {
        try {
            // 유효성 검사
            if (!this.guildData) {
                await this.loadOrCreate();
            };

            // 채널 타입에 따른 필드 지정
            switch (channelType) {
                case 'adminChannel':
                    this.guildData.adminChannelId = channelId;
                    break;
                case 'mainChannel':
                    this.guildData.mainChannelId = channelId;
                    break;
                default:
                    throw new Error('유효하지 않은 채널 타입입니다.');
            }

            // 변경 사항 저장
            await this.guildData.save();
        } catch (error) {
            console.error(`saveChannelId 에러: `, error);
        };
    };


    async loadChannelId(channelType) {
        try {
            // 유효성 검사
            if (!this.guildData) {
                await this.loadOrCreate();
            };

            // 채널 타입에 따라 해당되는 채널 ID 반환
            switch (channelType) {
                case 'adminChannel':
                    return this.guildData.adminChannelId;
                case 'mainChannel':
                    return this.guildData.mainChannelId;
                default:
                    throw new Error('유효하지 않은 채널 타입입니다.');
            };


        } catch (error) {
            console.error(`loadChannelId 에러: `, error);
        };
    };


};

GuildSettings.instances = {};

module.exports = GuildSettings;