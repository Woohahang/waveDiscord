// UserStettings.js

const userSchema = require('../mongoDB/userSchema');

class UserSettings {

    static async load(userId) {
        try {
            if (typeof userId !== 'string') {
                throw new Error('현우야 실수 했어 유저 ID는 문자열로 해야 돼 !!');
            }
            let userData = await userSchema.findOne({ userId });
            return userData || null;
        } catch (error) {
            console.error('UserSettings load 오류 : ', error);
            return null;
        };
    };


    static async loadOrCreate(userId) {
        // 유저 ID가 문자열인지 확인
        if (typeof userId !== 'string') {
            throw new Error('현우야 실수 했어 유저 ID는 문자열로 해야 돼 !!');
        }
        try {
            // 유저 데이터를 데이터베이스에서 찾거나 새로 생성
            let userData = await userSchema.findOne({ userId });
            if (!userData) {
                userData = new userSchema({ userId });
                await userData.save();
            }
            return userData;
        } catch (error) {
            console.error('UserSettings loadOrCreate 오류 : ', error);
            return null;
        }
    }


    static async saveNickName(userId, customId, content) {
        // 유저 ID가 문자열인지 확인
        if (typeof userId !== 'string') {
            throw new Error('현우야 실수 했어 유저 ID는 문자열로 해야 돼 !!');
        }
        try {
            // 유저 데이터를 데이터베이스에서 찾기
            let userData = await userSchema.findOne({ userId });
            if (!userData) {
                throw new Error('유저 데이터가 로드되지 않았습니다.');
            }

            let nickNameSave = false;

            // steam ID를 저장하거나 다른 ID를 저장
            if (customId === 'steam') {
                userData.steam = content;
                await userData.save();
                nickNameSave = true;
            } else if (userData[customId].length < 5 && customId !== 'steam') {
                userData[customId].push(content);
                await userData.save();
                nickNameSave = true;
            }

            return nickNameSave;
        } catch (error) {
            console.error('saveNickName 오류 : ', error);
            return false;
        }
    }













    // 아래는 언젠가 지울 코드들


    constructor(userId) {

        if (typeof userId !== 'string') {
            throw new Error('현우야 실수 했어 유저 ID는 문자열로 해야 돼 !!');
        };

        this.userId = userId;
        this.settingsData = null;
    };

    // 유저 설정을 불러옴
    async load() {
        try {
            let userData = await userSchema.findOne({ userId: this.userId });
            if (!userData) return undefined;

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

            if (customId === 'steam') {

                this.settingsData.steam = content;

                await this.settingsData.save();

                nickNameSave = true;

            } else if (this.settingsData[customId].length < 5 && customId !== 'steam') {

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