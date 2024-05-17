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

};

module.exports = GuildSettings;