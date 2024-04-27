const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    guildId: String,
    userId: String,
    steam: String,
    kakao: String,
    riotGames: String,
    updatedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

// MongoDB 서버에 userNicknameInfo 파일 생성, 그 안에 userSchema 저장
const UserNickname = mongoose.model('userNicknameInfo', userSchema);

module.exports = UserNickname;