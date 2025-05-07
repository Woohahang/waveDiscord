const STATE_KEYS = require('@constants/stateKeys');

const STATE_MESSAGES = {
    [STATE_KEYS.NO_USER_DATA]:
        '## 유저 정보 없음\n' +
        '> * 유저 정보를 찾을 수 없습니다.\n' +
        '> * 문제가 지속되면 **Wave** 디스코드 채널로 문의해 주세요.',

    [STATE_KEYS.NO_NICKNAMES]:
        '## 등록된 닉네임 없음\n' +
        '> * 현재 등록된 닉네임이 없습니다.\n' +
        '> * 문제가 지속되면 **Wave** 디스코드 채널로 문의해 주세요.',
};

/**
 * 상태 키에 해당하는 메시지를 반환합니다.
 * 
 * @param {string} stateKey - 상태 키
 * @returns {string}
 */
function getStateMessage(stateKey) {

    if (!STATE_MESSAGES[stateKey])
        throw new Error(`[stateMessage.getStateMessage] 상태 키를 찾을 수 없습니다. | stateKey: ${stateKey}`);

    return STATE_MESSAGES[stateKey];
}

module.exports = getStateMessage;