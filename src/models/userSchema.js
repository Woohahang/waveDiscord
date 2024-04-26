const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    guildId: String,
    userId: String,
    steam: String,
    kakao: String,
    loL: String,
    updatedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const UserNickname = mongoose.model('userNicknameInfo', userSchema);

module.exports = UserNickname;
