const userSchema = require('../mongoDB/userSchema');
const UserCacheManager = require('./UserCacheManager');

class UserSettings {
    constructor(userId) {
        this.userId = userId;
    }

    async #loadOrCreateUserData() {
        let userData = UserCacheManager.get(this.userId);
        if (!userData) {
            userData = await userSchema.findOne({ userId: this.userId });
            if (!userData) {
                const newUser = new userSchema({ userId: this.userId });
                await newUser.save();
                userData = newUser;
            }
            UserCacheManager.set(this.userId, userData);
        }
        return userData;
    }

    async loadUserData() {
        let userData = UserCacheManager.get(this.userId);
        if (!userData) {
            userData = await userSchema.findOne({ userId: this.userId });
            if (userData) {
                UserCacheManager.set(this.userId, userData);
            }
        }
        return userData;
    }

    async saveNickname(game, nickname) {
        try {
            let userData = UserCacheManager.get(this.userId);
            if (!userData) {
                userData = await this.#loadOrCreateUserData();
            }

            if (game !== 'steam' && userData[game].includes(nickname)) {
                return 'nicknameDuplicate';
            }

            if (game !== 'steam' && userData[game].length >= 5) {
                return 'nicknameLimitExceeded';
            }

            switch (game) {
                case 'steam':
                    userData.steam = nickname;
                    break;
                default:
                    userData[game].push(nickname);
                    break;
            }

            await userData.save();
            UserCacheManager.set(this.userId, userData);
            return 'saveSuccess';
        } catch (error) {
            console.error('UserSettings.saveNickname 예외:', error);
        }
    }

    async removeNickname(gameAndNicknames) {
        try {
            const userData = await this.loadUserData();
            if (!userData) return;

            gameAndNicknames.forEach(item => {
                const [game, nickname] = item.split(':');
                if (game === 'steam') {
                    userData[game] = [];
                } else {
                    const index = userData[game].indexOf(nickname);
                    if (index > -1) {
                        userData[game].splice(index, 1);
                    }
                }
            });

            await userData.save();
            UserCacheManager.set(this.userId, userData);
            return 'removalSuccessful';
        } catch (error) {
            console.error('UserSettings.removeNickname 예외:', error);
        }
    }

    async deleteUserData() {
        try {
            const userData = await this.loadUserData();
            if (!userData) return 'alreadyDeleted';

            await userSchema.deleteOne({ userId: this.userId });
            UserCacheManager.delete(this.userId);
            return 'deleteSuccess';
        } catch (error) {
            console.error('UserSettings.deleteUserData 예외:', error);
            return 'deleteError';
        }
    }

    getUserCount() {
        return UserCacheManager.count();
    }
}

module.exports = UserSettings;