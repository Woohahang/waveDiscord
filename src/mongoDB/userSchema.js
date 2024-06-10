// userSchema.js

const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({

    userId: String,

    // steam: [String],
    steam: [{
        playerName: String,
        profileLink: String
    }],
    leagueOfLegends: [String],
    teamfightTactics: [String],
    valorant: [String],
    steamBattleGround: [String],
    kakaoBattleGround: [String],
    blizzard: [String],
    overWatchTwo: [String],

    updatedAt: { type: Date, default: Date.now }

});

userSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const UserNickname = mongoose.model('userNicknameDB', userSchema);

module.exports = UserNickname;