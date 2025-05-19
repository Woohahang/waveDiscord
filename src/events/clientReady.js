const { Events } = require('discord.js');
const botInfo = require('@utils/botInfo');
const logger = require('@utils/logger');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(readyClient) {
        logger.info('[index] 봇 시작됨', { tag: readyClient.user.tag, id: readyClient.user.id });

        // client.startTime = new Date(); // 봇 시작 시간을 client 객체에 저장
        botInfo.set(readyClient.user); // 봇의 태그와 ID를 botInfo에 저장
    }
}