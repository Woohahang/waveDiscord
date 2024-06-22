const userSchema = require('../mongoDB/userSchema');

class UserSettings {
    // 모든 유저 데이터를 저장하는 정적 객체입니다.
    static userMaps = {};
    static userTimers = {};
    static THREE_HOURS_IN_MS = 3 * 60 * 60 * 1000;

    constructor(userId) {
        this.userId = userId; // 인스턴스의 유저 ID
        this.userData = null; // 인스턴스의 유저 데이터
    };

    // 캐시된 유저 데이터를 가져오는 비공개 메서드입니다.
    #getCachedUserData() {
        if (UserSettings.userMaps[this.userId]) {

            this.#resetTimer();

            return UserSettings.userMaps[this.userId];
        };
    };

    // 유저 데이터를 캐시에 저장하는 비공개 메서드입니다.
    #cacheUserData() {
        UserSettings.userMaps[this.userId] = this.userData;

        this.#resetTimer();
    };

    #resetTimer() {
        if (UserSettings.userTimers[this.userId]) {
            clearTimeout(UserSettings.userTimers[this.userId]);
        };

        UserSettings.userTimers[this.userId] = setTimeout(() => {
            this.#clearUserMap();
        }, UserSettings.THREE_HOURS_IN_MS);

    };

    #clearUserMap() {
        delete UserSettings.userMaps[this.userId];
        delete UserSettings.userTimers[this.userId];
    }

    // 데이터베이스에서 유저 데이터를 로드하는 비동기 메서드입니다.
    async loadUserDataFromDB() {
        try {
            if (!this.userData) {
                // console.log('데이터베이스 호출');
                this.userData = await userSchema.findOne({ userId: this.userId });
            };

            // 유저 데이터를 캐시에 저장
            this.#cacheUserData();

            return this.userData;
        } catch (error) {
            console.error('UserSettings.loadUserData 예외 ', error);
        };
    };

    // 캐시에서 유저 데이터를 로드하거나, 데이터베이스에서 로드하는 비동기 메서드입니다.
    async loadUserData() {
        try {
            // 캐시에서 유저 데이터를 가져옵니다.
            let userData = this.#getCachedUserData();

            if (!userData) {
                // 캐시에 없으면 데이터베이스에서 가지고 옵니다.
                userData = await this.loadUserDataFromDB();
            };

            return userData;
        } catch (error) {
            console.error('UserSettings.loadOrCreateUserData 예외 : ', error);
            return null;
        }

    };


    // async createUserData() {
    //     if (!this.userData) {
    //         // 새로운 유저 데이터 객체 생성
    //         const newUser = new userSchema({
    //             userId: this.userId,
    //             // 추가적인 필드 초기화
    //         });

    //         // 데이터베이스에 저장
    //         await newUser.save();

    //         // 메모리에 캐시
    //         this.userData = newUser;
    //     };
    // }


};


module.exports = UserSettings;