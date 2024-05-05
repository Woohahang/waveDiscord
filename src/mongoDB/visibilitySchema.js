const mongoose = require('mongoose');

let visibilitySchema = new mongoose.Schema({

    guildId: String,

    steam: { type: Boolean, default: false },
    riotGames: { type: Boolean, default: true },
    steamBG: { type: Boolean, default: false },
    kakaoBG: { type: Boolean, default: false },
    overWatchTwo: { type: Boolean, default: false },

});

const VisibilitySchema = mongoose.model('visibilitySchema', visibilitySchema);

module.exports = VisibilitySchema;