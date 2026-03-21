const userModel = require("../models/userModel");
const UserMapper = require('../mappers/userMapper');
const UserRepository = require('../../../../domain/user/repositories/userRepository');

class MongoUserRepository extends UserRepository {

    async findById(userId) {
        const document = await userModel.findOne({ userId });

        if (!document) return null;

        return UserMapper.toDomain(document);
    }

    async save(user) {
        const data = UserMapper.toPersistence(user);

        await userModel.updateOne(
            { userId: user.userId },
            { $set: data },
            { upsert: true }
        );
    }

    async deleteById(userId) {
        await userModel.deleteOne({ userId });
    }

}

module.exports = MongoUserRepository;