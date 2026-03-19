const UserCacheRepository = require('@application/user/ports/userCacheRepository');

class MemoryUserCacheRepository extends UserCacheRepository {
    constructor() {
        super();
        this.cache = new Map();
    }

    async get(userId) {
        return this.cache.get(userId) ?? null;
    }

    async set(user) {
        this.cache.set(user.userId, user);
    }

    async delete(userId) {
        this.cache.delete(userId);
    }

    async clear() {
        this.cache.clear();
    }
}

module.exports = MemoryUserCacheRepository;