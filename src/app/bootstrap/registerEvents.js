// const ready = require("../../infrastructure/discord/events/ready")
const guildCreate = require('@infrastructure/discord/events/guildCreate');
const interactionCreate = require("@infrastructure/discord/events/interactionCreate");
const voiceStateUpdate = require('@infrastructure/discord/events/voiceStateUpdate');

module.exports = function registerEvents(client, dependencies) {

    guildCreate(client, dependencies);
    interactionCreate(client, dependencies);
    voiceStateUpdate(client, dependencies);
}