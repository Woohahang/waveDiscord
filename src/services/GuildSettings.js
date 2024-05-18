// GuildSettings.js

const guildSettingsSchema = require('../mongoDB/guildSettingsSchema');

class GuildSettings {

    constructor(guildId) {

        if (typeof guildId !== 'string') {
            throw new Error('현우야 실수 했어 길드 ID는 문자열로 해야 돼 !!');
        };

        this.guildId = guildId;
    };

    // MongoDB 에서 길드 셋팅을 가지고 온다. 없다면 생성한다.
    async loadOrCreate() {
        try {

            let guildSettingsData = await guildSettingsSchema.findOne({ guildId: this.guildId });

            if (!guildSettingsData) {
                guildSettingsData = new guildSettingsSchema({ guildId: this.guildId });
                await guildSettingsData.save();
            };

            this.settingsData = guildSettingsData;
            return this.settingsData;

        } catch (error) {
            console.error(`GuildSettings loadOrCreate 오류: ${error}`);
            throw error; // 오류를 다시 던져서 상위 호출자가 이를 처리할 수 있도록 함
        }
    };

    // 채널 Id 업데이트
    async updateMainChannelId(newChannelId) {
        try {
            this.settingsData.mainChannelId = newChannelId;
            await this.settingsData.save();
        } catch (error) {
            console.error(`updateMainChannelId 오류: ${error}`);
            throw error;
        };
    };

    // 메인 채널 id 추출
    async loadMainChannelId() {
        try {
            // 길드 설정 데이터가 이미 불러와져 있지 않다면, 먼저 불러온다.
            if (!this.settingsData) {
                await this.loadOrCreate();
            };

            // 관리자 채널 Id를 반환한다.
            return this.settingsData.mainChannelId;

        } catch (error) {
            console.error('loadMainChannelId 에러 : ', error);
            throw error;
        };
    };


    // 관리자 Id 업데이트
    async updateAdminChannelId(newChannelId) {
        try {
            this.settingsData.adminChannelId = newChannelId;
            await this.settingsData.save();
        } catch (error) {
            console.error(`updateAdminChannelId 오류: ${error}`);
            throw error;
        };
    };

    // 관리자 채널 id 추출
    async loadAdminChannelId() {
        try {
            // 길드 설정 데이터가 이미 불러와져 있지 않다면, 먼저 불러온다.
            if (!this.settingsData) {
                await this.loadOrCreate();
            };

            // 관리자 채널 Id를 반환한다.
            return this.settingsData.adminChannelId;

        } catch (error) {
            console.error('loadAdminChannelId 에러 : ', error);
            throw error;
        };
    };



};

module.exports = GuildSettings;