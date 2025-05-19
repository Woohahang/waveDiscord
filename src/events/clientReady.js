const { Events } = require('discord.js');
const cron = require('node-cron');

const { EVERY_TEN_MINUTES } = require('@constants/cronSchedules');
const autoUpdateTiers = require('@modules/autoUpdate/autoUpdateTiers');
const botStatus = require('@utils/botStatus');
const logger = require('@utils/logger');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(readyClient) {
        const user = readyClient.user;

        logger.info('[index] 봇 시작됨', { tag: user.tag, id: user.id });
        botStatus.set(user);

        cron.schedule(EVERY_TEN_MINUTES, async () => {
            await autoUpdateTiers();
        });

    }
}