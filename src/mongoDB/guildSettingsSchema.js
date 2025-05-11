const mongoose = require('mongoose');
const GAME_TYPES = require('@constants/gameTypes');

let guildSettingsSchema = new mongoose.Schema({

    guildId: { type: String, required: true, unique: true },
    guildName: { type: String },
    ownerId: String,

    // Wave 채널 id 저장
    mainChannelId: String,
    adminChannelId: String,

    // 길드에서 다루는 게임
    [GAME_TYPES.STEAM]: { type: Boolean, default: false },
    [GAME_TYPES.LEAGUE_OF_LEGENDS]: { type: Boolean, default: false },
    [GAME_TYPES.TEAMFIGHT_TACTICS]: { type: Boolean, default: false },
    [GAME_TYPES.VALORANT]: { type: Boolean, default: false },
    [GAME_TYPES.STEAM_BATTLEGROUNDS]: { type: Boolean, default: false },
    [GAME_TYPES.KAKAO_BATTLEGROUNDS]: { type: Boolean, default: false },
    [GAME_TYPES.RAINBOW_SIX]: { type: Boolean, default: false },
    [GAME_TYPES.BLIZZARD]: { type: Boolean, default: false },
    [GAME_TYPES.OVERWATCH_2]: { type: Boolean, default: false },
    [GAME_TYPES.LOST_ARK]: { type: Boolean, default: false },

});

const GuildSettingsSchema = mongoose.model('guildSettingsSchema', guildSettingsSchema);

module.exports = GuildSettingsSchema;