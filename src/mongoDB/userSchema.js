const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    // 유저 Id 입니다.
    userId: { type: String, required: true },

    // 유저의 게임 닉네임들을 다루는 필드입니다.
    steam: [{
        playerName: String,
        profileLink: String
    }],
    leagueOfLegends: [{
        summonerName: {
            type: String,
            required: true
        },
        tier: {
            type: String,
            enum: ["IRON", "BRONZE", "SILVER", "GOLD", "PLATINUM", "EMERALD", "DIAMOND", "MASTER", "GRANDMASTER", "CHALLENGER"]
        },
        rank: {
            type: String,
            enum: ["I", "II", "III", "IV"]
        },
        leaguePoints: {
            type: Number,
            default: 0,
        }
    }],
    teamfightTactics: [String],
    valorant: [String],
    steamBattleGround: [String],
    kakaoBattleGround: [String],
    rainbowSix: [String],
    blizzard: [String],
    overWatchTwo: [String],
    lostArk: [String],

    // 마지막 업데이트 시간을 다루는 필드입니다.
    updatedAt: { type: Date, default: Date.now }

});

userSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;