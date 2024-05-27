// UserStettings.js

const userSchema = require('../mongoDB/userSchema');

// const settingsCache = {};

class UserSettings {
    constructor(userId) {
        this.validateUserId(userId);
        this.userId = userId;
        this.userData = null;
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
            throw new Error('UserSettings.saveNickName 의 userId 타입이 String이 아닙니다. userId 타입 : ', typeof userId);
        };

        try {

            let userData = this.userData;

            if (!userData) {
                userData = await this.loadOrCreateById(userId);
                this.userData = userData; // 캐시 갱신
            };

            // 중복 닉네임 체크
            if (userData[customId].includes(content)) {
                return 'nicknameDuplicate';

                // 닉네임 5개 초과 체크
            } else if (userData[customId].length > 4) {
                return 'nicknameLimitExceeded';

                // 스팀이면 배열 없이 저장
            } else if (customId === 'steam') {

                userData.steam = content;

                await userData.save();

                this.userData = userData; // 캐시 갱신
                return 'saveSuccess';

                // 모든 조건을 피하면 게임 닉네임 저장
            } else {
                userData[customId].push(content);
                await userData.save();

                this.userData = userData; // 캐시 갱신
                return 'saveSuccess';
            };

        } catch (error) {
            console.error('saveNickName 오류 : ', error);
            return 'saveError';
        };
    };


    static async removeNickName(userId, values) {
        try {
            // userId 객체
            const userData = await userSchema.findOne({ userId });

            // values 의 예시 { loL_끼매누, kakaoBG_카카오닉네임 }
            values.forEach(value => {
                // _ 를 기준으로 선언
                const [gameType, nickName] = value.split('_');

                if (userData[gameType]) {
                    // 게임 종류에서 닉네임이 몇 번째 위치에 있는지 파악
                    const index = userData[gameType].indexOf(nickName);
                    if (index > -1) {
                        // 그 위치 삭제
                        userData[gameType].splice(index, 1);
                    };
                };

            });

            // userData 저장
            await userData.save();

        } catch (error) {
            console.error('UserStettings.js 의 removeNickName 에러 : ', error);
        };
    };

};



module.exports = UserSettings;