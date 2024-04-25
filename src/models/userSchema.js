const mongoose = require('mongoose');

function addDefault(value) {
    if (!value.includes('#')) {
        value += "#KR1";
    }
    return value;
}

let userSchema = new mongoose.Schema({
    guildId: String,
    userId: String,
    steam: String,
    kakao: String,
    loL: {
        type: String,
        set: addDefault
    },
    updatedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const UserNickname = mongoose.model('userNicknameInfo', userSchema);

module.exports = UserNickname;
