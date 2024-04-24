const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    guildId: String,
    userId: String,
    steam: String,
    kakao: String,
    loL: String,
    updatedAt: { type: Date, default: Date.now }
});

const UserNickname = mongoose.model('userNicknameInfo', userSchema);

module.exports = UserNickname;
