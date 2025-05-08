const mongoose = require('mongoose');
const GAME_TYPES = require('@constants/gameTypes');

let userSchema = new mongoose.Schema({

    userId: { type: String, required: true, unique: true },

    // 유저의 게임 닉네임들을 다루는 필드입니다.
    [GAME_TYPES.STEAM]: [{
        playerName: String,
        profileLink: String
    }],
    [GAME_TYPES.LEAGUE_OF_LEGENDS]: [{
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
    [GAME_TYPES.TEAMFIGHT_TACTICS]: [String],
    [GAME_TYPES.VALORANT]: [String],
    [GAME_TYPES.STEAM_BATTLEGROUNDS]: [String],
    [GAME_TYPES.KAKAO_BATTLEGROUNDS]: [String],
    [GAME_TYPES.RAINBOW_SIX]: [String],
    [GAME_TYPES.BLIZZARD]: [String],
    [GAME_TYPES.OVERWATCH_2]: [String],
    [GAME_TYPES.LOST_ARK]: [String],

}, {
    // .save() 함수를 사용하면 마지막 업데이트 시간을 자동 기록합니다.
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;