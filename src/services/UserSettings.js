// UserStettings.js

const userSchema = require('../mongoDB/userSchema');

class UserSettings {

    constructor(userId) {

        if (typeof userId !== 'string') {
            throw new Error('현우야 실수 했어 유저 ID는 문자열로 해야 돼 !!');
        };

        this.userId = userId;
    };

    // 유저 설정을 불러옴
    async load() {
        try {
            let userData = await userSchema.findOne({ userId: this.userId });
            if (!userData) return false;

            this.settingsData = userData;
            return this.settingsData;
        } catch (error) {
            console.error('UserSettings load 오류 : ' + error);
        };
    };

    // 유저 설정을 불러옴 + 없으면 만들어서 불러옴
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

    async saveNickName(customId, content) {
        try {
            if (!this.settingsData) {
                throw new Error('유저 데이터가 로드되지 않았습니다.');
            };

            let nickNameSave = null;

            if (this.settingsData[customId].length < 5) {

                // 닉네임 업데이트
                this.settingsData[customId].push(content);

                await this.settingsData.save();

                // 닉네임 저장 성공 여부
                nickNameSave = true;
            } else {
                nickNameSave = false;
            };

            return nickNameSave;

        } catch (error) {
            console.error('saveNickName 에러 : ', error);
        };
    };

};

module.exports = UserSettings;