const UserCacheRepository = require('@application/user/ports/userCacheRepository');

class MemoryUserCacheRepository extends UserCacheRepository {
    constructor() {
        super();
        this.cache = new Map();
    }

    async get(userId) {
        if (!this.cache.has(userId)) {
            return { hit: false, value: null };
        }

        return {
            hit: true,
            value: this.cache.get(userId) // user or null
        };
    }

    async set(userId, user) {
        this.cache.set(userId, user); // user or null
    }

    async delete(userId) {
        this.cache.delete(userId);
    }

    async clear() {
        this.cache.clear();
    }
}

module.exports = MemoryUserCacheRepository;