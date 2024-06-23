const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    // 유저 Id 입니다.
    userId: String,

    // 유저 프로필 정보를 다루는 필드입니다.
    // 프로필 테두리 색상 저장
    // 한국 디스코드 리스트에 내 봇을 눌러준 하트 횟수 저장


    // 유저의 게임 닉네임들을 다루는 필드입니다.
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

    // 마지막 업데이트 시간을 다루는 필드입니다.
    updatedAt: { type: Date, default: Date.now }

});

userSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const UserNickname = mongoose.model('userNicknameDB', userSchema);

module.exports = UserNickname;