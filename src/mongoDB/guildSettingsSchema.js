const mongoose = require('mongoose');

let guildSettingsSchema = new mongoose.Schema({

    guildId: String,
    guildName: String,
    ownerId: String,

    // Wave 채널 id 저장
    mainChannelId: String,
    adminChannelId: String,


    // 별명 양식들 및 별명을 나누는 분리기호
    aliasPatterns: [String],
    aliasSeparator: String,
    aliasRoleId: String,


    // 길드에서 다루는 게임
    steam: { type: Boolean, default: false },
    leagueOfLegends: { type: Boolean, default: false },
    teamfightTactics: { type: Boolean, default: false },
    valorant: { type: Boolean, default: false },
    steamBattleGround: { type: Boolean, default: false },
    kakaoBattleGround: { type: Boolean, default: false },
    blizzard: { type: Boolean, default: false },
    overWatchTwo: { type: Boolean, default: false },
    lostArk: { type: Boolean, default: false },

});

const GuildSettingsSchema = mongoose.model('guildSettingsSchema', guildSettingsSchema);

module.exports = GuildSettingsSchema;