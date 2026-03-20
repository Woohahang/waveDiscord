const User = require('@domain/user/entities/User');

class UserMapper {
    static toDomain(doc) {
        if (!doc) return null;

        return new User({
            userId: doc.userId,
            games: doc.games,
        });
    }

    static toPersistence(user) {
        return {
            userId: user.userId,
            games: user.games,
        };
    }
}

module.exports = UserMapper;