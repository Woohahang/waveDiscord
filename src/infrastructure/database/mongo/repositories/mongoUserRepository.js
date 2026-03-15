const userModel = require("../models/userModel");
const UserRepository = require('../../../../domain/user/repositories/UserRepository');
const User = require('../../../../domain/user/entities/User');

class MongoUserRepository extends UserRepository {

    // 언제 필요한지 아직 모르겠다.
    // static fromDocument(document) {
    // }

    async findById(userId) {
        const document = await userModel.findOne({ userId });

        if (!document) return null;

        return this.toEntity(document);
    }

    async save(user) {
        const document = this.toDocument(user);

        await userModel.updateOne(
            { userId: user.userId },
            { $set: document },
            { upsert: true }
        );
    }

    toEntity(document) {
        return new User({
            userId: document.userId,
            games: {
                teamfightTactics: document.teamfightTactics,
                valorant: document.valorant,
                steamBattleGround: document.steamBattleGround,
                kakaoBattleGround: document.kakaoBattleGround,
                rainbowSix: document.rainbowSix,
                blizzard: document.blizzard,
                overWatchTwo: document.overWatchTwo,
                lostArk: document.lostArk,
                steam: document.steam,
                leagueOfLegends: document.leagueOfLegends,
            }
        });
    }

    toDocument(user) {
        return {
            userId: user.userId,
            ...user.games,
        };
    }


}

module.exports = MongoUserRepository;