const { Events } = require('discord.js');
const logger = require('@utils/logger');
const initializeBotStatus = require('@modules/botStartup/initializeBotStatus');
const initializeCronJobs = require('@modules/botStartup/initializeCronJobs');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(readyClient) {
        const user = readyClient.user;

        logger.info('[clientReady] 봇 시작됨', { tag: user.tag, id: user.id });

        initializeBotStatus(user);
        initializeCronJobs();
    }
}