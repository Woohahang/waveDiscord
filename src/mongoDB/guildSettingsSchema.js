const mongoose = require('mongoose');

let guildSettingsSchema = new mongoose.Schema({

    guildId: String,
    guildName: String,

    // Wave 채널 id 저장
    mainChannelId: String,
    adminChannelId: String,


    // 별명 양식들 및 별명을 나누는 분리기호
    // aliasPatterns: [String],
    // aliasSeparator: String,
    // aliasRoleId: String,


    // 길드에서 다루는 게임
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