require('module-alias/register');
require('dotenv').config();
const createClient = require('./bootstrap/createClient.js');
const connectDatabase = require('./bootstrap/connectDatabase.js');
const createDependencies = require('./bootstrap/createDependencies.js');
const registerEvents = require('./bootstrap/registerEvents.js');
const token = process.env.TEST_DISCORD_TOKEN;

const client = createClient();

async function main() {

    await connectDatabase();                        // 데이터베이스 연결
    const dependencies = createDependencies();      // 조립소

    registerEvents(client, dependencies);           // 실행 로직

    await client.login(token);                      // 로그인: Disocrd Bot
}

main();

