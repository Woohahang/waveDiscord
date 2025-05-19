const logger = require('./logger');

const botStatus = {
    botTag: null,
    botId: null,
    startTime: null
};

/**
 * 봇 정보를 설정합니다.
 * 
 * @param {Object} botUser - 봇 정보 객체
 * @param {string} botUser.userTag - 봇 태그
 * @param {string} botUser.id - 봇 ID
 * @param {Date} [botUser.startTime] - 봇 시작 시간 (자동 저장됨)
 */
function set(botUser) {
    if (!botUser?.tag || !botUser?.id) {
        throw new Error('[botStatus.set] botTag과 botId를 찾을 수 없습니다.');
    }

    botStatus.botTag = botUser.tag;
    botStatus.botId = botUser.id;
    botStatus.startTime = new Date();

    logger.info('[botStatus.set] 봇 정보 설정됨', { tag: botUser.tag, id: botUser.id });
}

/**
 * 봇 정보를 반환합니다.
 * 
 * @returns {{ botTag: string, botId: string }}
 */
function get() {
    return { ...botStatus };
}

module.exports = { set, get };