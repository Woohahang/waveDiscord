const mongoose = require('mongoose');

let guildSettingsSchema = new mongoose.Schema({

    guildId: String,
    guildName: String,
    mainChannelId: String, // 내 봇을 다루는 메인 채널
    adminChannelId: String, // 관리자 채널

    steam: { type: Boolean, default: true },
    loL: { type: Boolean, default: true },
    tfT: { type: Boolean, default: true },
    valorant: { type: Boolean, default: true },
    steamBG: { type: Boolean, default: true },
    kakaoBG: { type: Boolean, default: true },
    blizzard: { type: Boolean, default: true },
    overWatchTwo: { type: Boolean, default: true },

});

const GuildSettingsSchema = mongoose.model('guildSettingsSchema', guildSettingsSchema);

module.exports = GuildSettingsSchema;