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
        if (typeof userId !== 'string') {
            throw new Error('UserSettings.saveNickName 의 userId 타입이 String이 아닙니다.', userId);
        };

        try {
            // 유저 데이터 불러오기
            const userData = await userSchema.findOne({ userId });
            if (!userData) {
                throw new Error('유저 데이터가 로드되지 않았습니다.');
            }

            // 중복 닉네임 체크
            if (this.isNicknameDuplicate(userData, customId, content)) {
                return 'nicknameDuplicate';
            }

            // 닉네임 5개 제한
            if (this.isNicknameLimitExceeded(userData, customId)) {
                return 'nicknameLimitExceeded';
            }

            // 닉네임 저장
            await this.storeNickname(userData, customId, content);
            return 'saveSuccess';

        } catch (error) {
            console.error('saveNickName 오류 : ', error);
            return 'saveError';
        };
    };

    static isNicknameDuplicate(userData, customId, content) {
        return userData[customId] && userData[customId].includes(content);
    };

    static isNicknameLimitExceeded(userData, customId) {
        return customId === 'steam' ? false : (userData[customId].length > 4);
    };

    static async storeNickname(userData, customId, content) {
        if (customId === 'steam') {
            userData.steam = content;
        } else {
            userData[customId].push(content);
        };
        await userData.save();
    };











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

};

module.exports = UserSettings;