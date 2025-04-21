class UserCacheManager {
    static cache = {};
    static MAX_CACHE_SIZE = 1000;

    static get(userId) {
        const cached = this.cache[userId];
        if (cached) {
            cached.timestamp = Date.now();
            return cached.data;
        }
        return null;
    }

    static set(userId, data) {
        this.cache[userId] = {
            data,
            timestamp: Date.now(),
        };
        this.#checkCacheSize();
    }

    static delete(userId) {
        delete this.cache[userId];
    }

    static count() {
        return Object.keys(this.cache).length;
    }

    static #checkCacheSize() {
        const keys = Object.keys(this.cache);
        if (keys.length > this.MAX_CACHE_SIZE) {
            keys.sort((a, b) => this.cache[a].timestamp - this.cache[b].timestamp);
            delete this.cache[keys[0]];
        }
    }
}

module.exports = UserCacheManager;