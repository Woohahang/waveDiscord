const botStatus = require('@utils/botStatus');

module.exports = function initializeBotStatus(user) {
    botStatus.set(user);
}
