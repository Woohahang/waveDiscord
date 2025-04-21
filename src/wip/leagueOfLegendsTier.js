const mongoose = require('mongoose');

/**
 * 리그오브레전드 티어 데이터를 저장할 스키마입니다.
 */
let leagueOfLegendsTierSchema = new mongoose.Schema({

    // 유저의 Discord ID
    userId: { type: String, required: true },

    // 리그오브레전드 닉네임
    nickname: {
        type: String,
        required: true,
    },

    // 리그오브레전드 티어
    tier: {
        type: String,
        required: true,
        enum: ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Grandmaster", "Challenger"]
    },

    // 리그오브레전드 계정의 랭크
    rank: {
        type: String,
        required: true,
        enum: ["I", "II", "III", "IV"]
    },

    // 마지막 업데이트 시간
    lastUpdated: {
        type: Date,
        default: Date.now
    }

});

// `userId`와 `nickname`를 기준으로 유일한 값으로 데이터를 저장
leagueOfLegendsTierSchema.index({ userId: 1, nickname: 1 }, { unique: true });

const LeagueOfLegendsTier = mongoose.model('leagueOfLegendsTierDB', leagueOfLegendsTierSchema);

module.exports = LeagueOfLegendsTier;