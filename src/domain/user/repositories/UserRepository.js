class UserRepository {

    async findById(userId) {
        throw new Error("UserRepository.findById() not implemented");
    }

    async save(user) {
        throw new Error("UserRepository.save() not implemented");
    }

    async deleteById(userId) {
        throw new Error("UserRepository.deleteById() not implemented");
    }

}

module.exports = UserRepository;