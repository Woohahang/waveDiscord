const GAME_TYPES = require('@constants/gameTypes');
const User = require('@domain/user/entities/User');

class UserMapper {
    static toDomain(doc) {
        if (!doc) return null;

        return new User({
            userId: doc.userId,
            games: {
                [GAME_TYPES.STEAM]: doc[GAME_TYPES.STEAM] ?? [],
                [GAME_TYPES.LEAGUE_OF_LEGENDS]: doc[GAME_TYPES.LEAGUE_OF_LEGENDS] ?? [],
                [GAME_TYPES.TEAMFIGHT_TACTICS]: doc[GAME_TYPES.TEAMFIGHT_TACTICS] ?? [],
                [GAME_TYPES.VALORANT]: doc[GAME_TYPES.VALORANT] ?? [],
                [GAME_TYPES.STEAM_BATTLEGROUNDS]: doc[GAME_TYPES.STEAM_BATTLEGROUNDS] ?? [],
                [GAME_TYPES.KAKAO_BATTLEGROUNDS]: doc[GAME_TYPES.KAKAO_BATTLEGROUNDS] ?? [],
                [GAME_TYPES.RAINBOW_SIX]: doc[GAME_TYPES.RAINBOW_SIX] ?? [],
                [GAME_TYPES.BLIZZARD]: doc[GAME_TYPES.BLIZZARD] ?? [],
                [GAME_TYPES.OVERWATCH_2]: doc[GAME_TYPES.OVERWATCH_2] ?? [],
                [GAME_TYPES.LOST_ARK]: doc[GAME_TYPES.LOST_ARK] ?? [],
            },
        });
    }

    static toPersistence(user) {
        return {
            userId: user.userId,
            ...user.games,
        };
    }
}

module.exports = UserMapper;