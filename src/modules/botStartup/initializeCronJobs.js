const cron = require('node-cron');
const { EVERY_TEN_MINUTES } = require('@constants/cronSchedules');
const autoUpdateTiers = require('@modules/autoUpdate/autoUpdateTiers');

module.exports = function initializeCronJobs() {
    cron.schedule(EVERY_TEN_MINUTES, async () => {
        await autoUpdateTiers();
    });
}
