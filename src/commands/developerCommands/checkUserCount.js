const { SlashCommandBuilder } = require('discord.js');
const userCacheManager = require('@services/UserCacheManager');
const { developerId } = require('../../../../config.json');
const getElapsedTime = require('../../module/common/getElapsedTime');
const formatDate = require('../../module/common/formatDate');
const botStatus = require('@utils/botStatus');
const logger = require('@utils/logger');

/**
 * 상태 메시지를 생성하는 함수
 * @param {number} userCount - 현재 로드된 유저 수
 * @param {number} guildCount - 현재 연결된 길드 수
 * @param {Date} startTime - 봇 시작 시간
 * @returns {string} - 포맷된 상태 메시지
 */
const message = (userCount, guildCount, startTime) =>
    `# Wave\n` +
    `> **Connected Guilds** : ${guildCount}\n` +
    `> **Loaded Users** : ${userCount}\n` +
    `> **Bot Start Time** : ${formatDate(startTime)}\n` +
    `> **Elapsed Time** : ${getElapsedTime(startTime)}`;

/* 이 커맨드는 현재 로드된 유저의 수를 확인하는 기능을 제공합니다. */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('상태')
        .setDescription('봇의 연결 상태와 유저 정보를 확인합니다.'),

    async execute(interaction) {

        // 명령어를 실행한 사용자가 개발자인지 확인합니다.
        const user = interaction.user;
        if (user.id !== developerId) return;

        try {
            // 로드된 유저 수를 가져옵니다.
            const userCount = userCacheManager.count();

            // 현재 봇이 연결된 서버(길드)의 수를 가져옵니다.
            const guildCount = interaction.client.guilds.cache.size;

            // 봇 시작 시간을 가져옵니다.
            const startTime = botStatus.get().startTime;

            // 디스코드 채팅에 비공개 메시지로 응답합니다.
            await interaction.reply({
                content: message(userCount, guildCount, startTime),
                ephemeral: true
            });

        } catch (error) {
            logger.error('[checkUserCount] /상태 커맨드 오류', {
                userId: user.id,
                error: error.stack
            });
        };

    }
};