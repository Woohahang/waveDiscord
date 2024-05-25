// UserStettings.js

const userSchema = require('../mongoDB/userSchema');

const settingsCache = {};


class UserSettings {
    constructor(userId) {
        this.validateUserId(userId);
        this.userId = userId;
        this.settingsData = null;
    };

    // 유저 ID 검증
    validateUserId(userId) {
        if (typeof userId !== 'string') {
            throw new Error('유저 ID는 문자열로 해야 합니다.');
        };
    };

    // 유저 데이터 불러오기
    static async load(userId) {
        try {
            // 캐시 되어 있다면 로드
            if (settingsCache[userId]) {
                console.log('유저 캐시가 있습니다. : ', userId);
                return settingsCache[userId];
            };

            let userData = await userSchema.findOne({ userId });
            if (!userData) { return null; };

            return userData;

        } catch (error) {
            console.error('UserStettings.js 에러 : ', error);
        };
    };


    // 데이터베이스에서 유저 설정을 불러오거나 새로 생성
    static async loadOrCreateById(userId) {
        let userData = await userSchema.findOne({ userId });
        if (!userData) {
            userData = new userSchema({ userId });
            await userData.save();
        };
        return userData;
    };

    static async saveNickName(userId, customId, content) {
        if (typeof userId !== 'string') {
            throw new Error('UserSettings.saveNickName 의 userId 타입이 String이 아닙니다.', userId);
        };

        try {
            // 유저 데이터 불러오기
            const userData = await userSchema.findOne({ userId });

            if (!userData) {
                // userData 가 없다면 생성
                await this.loadOrCreateById(userId);

                // 중복 닉네임 체크
            } else if (userData[customId].includes(content)) {
                return 'nicknameDuplicate';

                // 닉네임 5개 초과 체크
            } else if (userData[customId].length > 4) {
                return 'nicknameLimitExceeded';

                // 스팀이면 배열 없이 저장
            } else if (customId === 'steam') {

                userData.steam = content;

                await userData.save();

                return 'saveSuccess';

                // 모든 조건을 피하면 게임 닉네임 저장
            } else {
                userData[customId].push(content);
                await userData.save();

                return 'saveSuccess';
            };

        } catch (error) {
            console.error('saveNickName 오류 : ', error);
            return 'saveError';
        };
    };


    static async removeNickName() {

    };

};



module.exports = UserSettings;