const mongoose = require('mongoose');

let guildSettingsSchema = new mongoose.Schema({

    guildId: String,
    guildName: String,
    mainChannelId: String, // 내 봇을 다루는 메인 채널
    adminChannelId: String, // 관리자 채널

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