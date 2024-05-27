// UserStettings.js

const userSchema = require('../mongoDB/userSchema');

class UserSettings {
    constructor(userId) {

        if (typeof userId !== 'string' || userId.trim() === '') {
            throw new Error('유효하지 않은 userId입니다.');
        };

        // 싱글톤 패턴
        if (!UserSettings.instances[userId]) {
            this.userId = userId;
            this.userData = null;
            UserSettings.instances[userId] = this;
            // 타이머 설정
            this.#resetTimer(userId);
        } else {
            // 이미 인스턴스가 존재한다면 타이머만 리셋
            UserSettings.instances[userId].#resetTimer(userId);
        };
        return UserSettings.instances[userId];
    };

    #resetTimer(userId) {
        // 기존 타이머가 있다면 취소
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        // 새 타이머 설정
        this.timeout = setTimeout(() => {
            // 타이머가 완료되면 인스턴스 삭제
            if (UserSettings.instances[userId]) {
                delete UserSettings.instances[userId];
            } else {
                console.error('인스턴스 삭제 실패: 인스턴스가 이미 존재하지 않습니다.');
            }
        }, 60000); // 일단 테스트를 위해 60초
    };


    async load() {
        try {
            if (!this.userData) {
                this.userData = await userSchema.findOne({ userId: this.userId });
            };

            return this.userData;
        } catch (error) {
            console.error('UserStettings.js 의 load 에러 : ', error);
        };
    };


    // 닉네임 저장 메서드
    async saveNickName(customId, content) {

        if (!this.userData) {
            this.userData = await userSchema.findOne({ userId: this.userId });
        };

        let userData = this.userData;

        try {
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
            console.error('saveNickName 에러 : ', error);
            return 'saveError';
        };
    };

    async removeNickName(values) {
        try {
            if (!this.userData) {
                this.userData = await userSchema.findOne({ userId: this.userId });
            };

            let userData = this.userData;

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

            // 캐시 갱신
            this.userData = userData;

        } catch (error) {
            console.error('removeNickName 에러 : ', error)
        }
    };

};

UserSettings.instances = {};

module.exports = UserSettings;