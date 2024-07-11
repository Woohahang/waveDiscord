const userSchema = require('../mongoDB/userSchema');

class UserSettings {
    // 모든 유저 데이터를 저장하는 정적 객체입니다.
    static userMaps = {};
    static MAX_CACHE_SIZE = 1000; // 캐시 최대 크기입니다.

    constructor(userId) {
        this.userId = userId; // 인스턴스의 유저 ID
    };

    // 캐시된 유저 데이터를 가져오는 비공개 메서드입니다.
    #getCachedUserData() {
        const cachedData = UserSettings.userMaps[this.userId];
        if (cachedData) {
            cachedData.timestamp = Date.now(); // 접근 시 타임스탬프를 갱신합니다.
            return cachedData.data;
        };
        return null;
    };

    // 유저 데이터를 캐시에 저장하는 비공개 메서드입니다.
    #cacheUserData(userData) {
        UserSettings.userMaps[this.userId] = {
            data: userData,
            timestamp: Date.now()
        };

        this.#checkCacheSize();
    };

    // 캐시의 크기를 확인하고, 초과 시 오래된 항목을 제거합니다.
    #checkCacheSize() {
        const keys = Object.keys(UserSettings.userMaps);
        if (keys.length > UserSettings.MAX_CACHE_SIZE) {
            // 타임스탬프를 기준으로 정렬하여 오래된 항목을 찾습니다.
            keys.sort((a, b) => UserSettings.userMaps[a].timestamp - UserSettings.userMaps[b].timestamp);
            const oldestKey = keys[0];
            delete UserSettings.userMaps[oldestKey];
        };
    };

    // 데이터베이스에서 유저 데이터를 로드하는 비동기 메서드입니다.
    async #loadUserDataFromDB() {
        try {
            const userData = await userSchema.findOne({ userId: this.userId });
            if (userData) {
                this.#cacheUserData(userData);
            };
            return userData;
        } catch (error) {
            console.error('UserSettings.loadUserData 예외 ', error);
        };
    };

    // 유저 데이터가 없는지 확인하고 유저 데이터를 만듭니다.
    async #loadOrCreateUserData() {
        try {
            // 캐시에서 유저 데이터를 가져옵니다.
            let userData = this.#getCachedUserData();

            if (!userData) {
                // 데이터베이스에서 유저 데이터를 확인합니다.
                userData = await userSchema.findOne({ userId: this.userId });

                if (!userData) {
                    // 유저 데이터가 존재하지 않으면 새로 생성합니다.
                    const newUser = new userSchema({ userId: this.userId });
                    await newUser.save();
                    userData = newUser;
                };

                // 유저 데이터를 캐시에 저장합니다.
                this.#cacheUserData(userData);
            };

            return userData;

        } catch (error) {
            console.error('UserSettings.createUserData() 예외 : ', error);
        };
    };


    // 캐시에서 유저 데이터를 로드하거나, 데이터베이스에서 로드하는 비동기 메서드입니다.
    async loadUserData() {
        try {
            // 캐시에서 유저 데이터를 가져옵니다.
            let userData = this.#getCachedUserData();

            if (!userData) {
                // 캐시에 없으면 데이터베이스에서 가지고 옵니다.
                userData = await this.#loadUserDataFromDB();
            };

            return userData;
        } catch (error) {
            console.error('UserSettings.loadUserData 예외 : ', error);
            return null;
        };
    };


    async saveNickname(game, nickname) {
        try {
            // 캐시에서 유저 데이터를 가져옵니다.
            let userData = this.#getCachedUserData();

            // 캐시에 데이터가 없으면 데이터베이스에서 로드하거나 생성합니다.
            if (!userData) {
                userData = await this.#loadOrCreateUserData();
            };

            // 닉네임이 중복될 경우 'nicknameDuplicate' 반환합니다.
            if (userData[game].includes(nickname)) {
                return 'nicknameDuplicate';
            };

            // 닉네임 개수가 초과되면 'nicknameLimitExceeded' 반환합니다. : 최대 5개
            if (userData[game].length >= 5) {
                return 'nicknameLimitExceeded';
            };

            // game 에 따라 닉네임 저장 방식 결정
            switch (game) {
                case 'steam':
                    // 스팀이면 덮어씁니다.
                    userData.steam = nickname;
                    break;

                default:
                    // 그 외는 배열에 저장합니다.
                    userData[game].push(nickname);
                    break;
            };

            // 변경된 유저 데이터를 데이터베이스에 저장합니다.
            await userData.save();
            this.#cacheUserData(userData); // 캐시에 저장

            return 'saveSuccess';

        } catch (error) {
            console.error('UserSettings.saveNickname 예외 : ', error);
        };
    };

    async removeNickname(gameAndNicknames) {
        try {
            // 유저 데이터를 캐시 또는 데이터베이스에서 로드합니다.
            let userData = await this.loadUserData();

            // gameAndNicknames 배열의 각 항목에 대해 처리합니다.
            gameAndNicknames.forEach(gameAndNickname => {
                const [game, nickname] = gameAndNickname.split(':');

                switch (game) {
                    // 스팀의 경우 모든 닉네임을 빈 배열로 설정합니다.
                    case 'steam':
                        userData[game] = [];
                        break

                    default:
                        // 기타 게임의 경우 해당 닉네임을 배열에서 제거합니다.
                        const index = userData[game].indexOf(nickname);
                        if (index > -1) {
                            // 그 위치 삭제
                            userData[game].splice(index, 1);
                        };
                };
            });

            // 변경된 유저 데이터를 데이터베이스와 캐시에 저장합니다.
            await userData.save();
            this.#cacheUserData(userData);

            return 'removalSuccessful';

        } catch (error) {
            console.error('UserSettings.removeNickname() 예외 : ', error);
        };
    };

    async deleteUserData() {
        try {
            // 유저 데이터를 캐시 또는 데이터베이스에서 로드합니다.
            let userData = await this.loadUserData();

            if (!userData) {
                return 'alreadyDeleted';
            };

            // 데이터베이스와 캐시에서 유저 정보를 삭제합니다.
            await userSchema.deleteOne({ userId: this.userId });
            delete UserSettings.userMaps[this.userId];

            return 'deleteSuccess';
        } catch (error) {
            console.error('UserSettings.deleteUserData() 예외 : ', error);
            return 'deleteError';
        };
    };
};

module.exports = UserSettings;
