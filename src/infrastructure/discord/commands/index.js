const registerNicknameCommand = require('./nickname/registerNicknameCommand');
const setupCommand = require('./guild/setupCommand');
const statusCommand = require('./dev/statusCommand');

module.exports = [
    registerNicknameCommand,
    setupCommand,
    statusCommand,
];