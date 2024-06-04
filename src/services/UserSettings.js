// UserStettings.js

const userSchema = require('../mongoDB/userSchema');

const ONE_HOUR = 3_600_000; // 1시간을 밀리세컨드로
const THREE_HOURS = 3 * ONE_HOUR; // 3시간

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
        }, THREE_HOURS);
    };

    // 유저 데이터 불러오기
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

    // 유저 데이터 불러오기 또는 생성
    async loadOrCreateById() {
        try {
            // 유저 데이터가 메모리에 없다면 데이터베이스에서 불러오기
            if (!this.userData) {
                this.userData = await userSchema.findOne({ userId: this.userId });
            }

            // 데이터가 데이터베이스에도 없다면 새로 생성
            if (!this.userData) {
                // 새로운 유저 데이터 객체 생성
                const newUser = new userSchema({
                    userId: this.userId,
                    // 추가적인 필드 초기화
                });

                // 데이터베이스에 저장
                await newUser.save();

                // 메모리에 캐시
                this.userData = newUser;
            };

            return this.userData;
        } catch (error) {
            console.error('UserStettings.js 의 loadOrCreateById 에러 : ', error);
        }
    };

    // 닉네임 저장 메서드
    async saveNickName(customId, content) {

        // 없다면 불러오기 또는 생성
        if (!this.userData) {
            this.userData = await this.loadOrCreateById();
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

            // userData 의 모든 배열 요소만 확인하고, 모든 배열 길이가 0이라면 true
            const allNicknamesRemoved = !Object.keys(userData.toObject()).some(key =>
                Array.isArray(userData[key]) && userData[key].length > 0
            );

            if (allNicknamesRemoved) {
                // 모든 닉네임이 삭제되었으면 유저 정보 삭제
                await userSchema.deleteOne({ userId: this.userId });
                // 메모리에서도 인스턴스 삭제
                if (UserSettings.instances[this.userId]) {
                    delete UserSettings.instances[this.userId];
                };

            } else {
                // 아니라면 변경사항 저장
                await userData.save();
                // 캐시 갱신
                this.userData = userData;
            };

        } catch (error) {
            console.error('removeNickName 에러 : ', error)
        }
    };

};

UserSettings.instances = {};

module.exports = UserSettings;