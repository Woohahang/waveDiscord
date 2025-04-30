const logger = require('../utils/logger');

const botInfo = {
    botTag: null,
    botId: null,
};

/**
 * 봇 정보를 설정합니다.
 * 
 * @param {Object} botUser - 봇 정보 객체
 * @param {string} botUser.userTag - 봇 태그
 * @param {string} botUser.id - 봇 ID
 */
function set(botUser) {
    if (!botUser?.tag || !botUser?.id) {
        throw new Error('[botInfo.set] botTag과 botId를 찾을 수 없습니다.');
    }

    botInfo.botTag = botUser.tag;
    botInfo.botId = botUser.id;

    logger.info(`[botInfo.set] 봇 정보 설정됨 | tag: ${botUser.tag} | id: ${botUser.id}`);
}

/**
 * 봇 정보를 반환합니다.
 * 
 * @returns {{ botTag: string, botId: string }}
 */
function get() {
    return { ...botInfo };
}

module.exports = { set, get };