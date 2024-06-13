const mongoose = require('mongoose');

let guildSettingsSchema = new mongoose.Schema({

    guildId: String,
    guildName: String,
    mainChannelId: String, // 내 봇을 다루는 메인 채널
    adminChannelId: String, // 관리자 채널

    // 별명 형식을 나타내는 객체
    nickNameFormat: {
        age: { type: Boolean, default: false }, // 나이 포함 여부
        nickName: { type: Boolean, default: true }, // 별명 포함 여부
        gender: { type: Boolean, default: false }, // 성별 포함 여부
        tier: { type: Boolean, default: false } // 티어 포함 여부
    },

    steam: { type: Boolean, default: true },
    leagueOfLegends: { type: Boolean, default: true },
    teamfightTactics: { type: Boolean, default: true },
    valorant: { type: Boolean, default: true },
    steamBattleGround: { type: Boolean, default: true },
    kakaoBattleGround: { type: Boolean, default: true },
    blizzard: { type: Boolean, default: true },
    overWatchTwo: { type: Boolean, default: true },

});

const GuildSettingsSchema = mongoose.model('guildSettingsSchema', guildSettingsSchema);

module.exports = GuildSettingsSchema;