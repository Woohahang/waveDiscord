const UserCacheRepository = require('@application/user/ports/userCacheRepository');

class MemoryUserCacheRepository extends UserCacheRepository {
    constructor() {
        super();
        this.cache = new Map();
    }

    async get(userId) {
        const hasUser = this.cache.has(userId);

        if (!hasUser)
            return { hit: false, value: null };

        return {
            hit: true,
            value: this.cache.get(userId),
        };
    }

    async set(userId, user) {
        this.cache.set(userId, user);
    }

    async delete(userId) {
        this.cache.delete(userId);
    }

    async clear() {
        this.cache.clear();
    }
}

module.exports = MemoryUserCacheRepository;