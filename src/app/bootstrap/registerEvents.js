// app/bootstrap/registerEvents.js

// const ready = require("../../infrastructure/discord/events/ready")
const interactionCreate = require("../../infrastructure/discord/events/interactionCreate");
// const voiceStateUpdate = require("../infrastructure/discord/events/voiceStateUpdate")

module.exports = function registerEvents(client, dependencies) {

    // ready(client);

    interactionCreate(client, dependencies);

    // voiceStateUpdate(client, dependencies);

}