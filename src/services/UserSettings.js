// UserStettings.js

const userSchema = require('../mongoDB/userSchema');

class UserSettings {

    constructor(userId) {

        if (typeof userId !== 'string') {
            throw new Error('현우야 실수 했어 유저 ID는 문자열로 해야 돼 !!');
        };

        this.userId = userId;
    };


    async load() {
        try {
            let userData = await userSchema.findOne({ userId: this.userId });
            if (!userData) return;

            this.settingsData = userData;
            return this.settingsData;
        } catch (error) {
            console.error('UserSettings load 오류 : ' + error);
        }
    };

    async loadOrCreate() {
        try {

            let userData = await userSchema.findOne({ userId: this.userId });

            if (!userData) {
                userData = new userSchema({ userId: this.userId });
                await userData.save();
            };

            this.settingsData = userData;
            return this.settingsData;

        } catch (error) {
            console.error('UserSettings loadOrCreate 오류 : ' + error);
        };

    };

};

module.exports = UserSettings;