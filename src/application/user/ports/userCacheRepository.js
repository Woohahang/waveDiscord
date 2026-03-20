class UserCacheRepository {
    async get(userId) {
        throw new Error('UserCacheRepository.get must be implemented');
    }

    async set(userId, user) {
        throw new Error('UserCacheRepository.set must be implemented');
    }

    async delete(userId) {
        throw new Error('UserCacheRepository.delete must be implemented');
    }

    async clear() {
        throw new Error('UserCacheRepository.clear must be implemented');
    }
}

module.exports = UserCacheRepository;