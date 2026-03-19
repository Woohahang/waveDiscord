require('module-alias/register');
require('dotenv').config();

const registerCommands = require('./bootstrap/registerCommands');
const commands = require('@infrastructure/discord/commands');

async function main() {
    await registerCommands(commands);
}

main().catch(error => {
    console.error('[registerDiscordCommands] 커맨드 등록 실패', error);
    process.exit(1);
});