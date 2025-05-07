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

    [STATE_KEYS.DELETE_SUCCESS]:
        '## 사용자 정보 삭제\n' +
        '> * 사용자 정보가 성공적으로 삭제되었습니다.\n' +
        '> * 닉네임을 등록하면 **Wave**는 언제나 다시 사용할 수 있습니다.',

    [STATE_KEYS.DELETE_FAIL]:
        '## 사용자 정보 삭제 실패\n' +
        '> * 사용자 정보를 삭제하는 중 오류가 발생했습니다.\n' +
        '> * 문제가 지속될 경우, **Wave** 디스코드를 방문해 주세요.',

    [STATE_KEYS.NICKNAME_SAVE_SUCCESS]:
        '\n' + `## 닉네임 등록 완료` +
        '\n' + '> * 음성 채널 입장 후 채팅을 열어보세요 !' +
        '\n' + '> * **Wave** 가 사용자 정보를 보여줍니다 !',

    [STATE_KEYS.NICKNAME_SAVE_LIMIT_EXCEEDED]:
        '\n' + `## 닉네임 등록 실패` +
        '\n' + '> * 해당 게임은 저장할 수 있는 닉네임 개수를 초과했습니다.' +
        '\n' + '> * 문제가 지속되면 **Wave** 디스코드 채널로 문의해 주세요.',

    [STATE_KEYS.NICKNAME_SAVE_DUPLICATE]:
        '\n' + `## 닉네임 등록 실패` +
        '\n' + '> * 중복 된 닉네임이 있습니다.' +
        '\n' + '> * 문제가 지속되면 **Wave** 디스코드 채널로 문의해 주세요.',

    [STATE_KEYS.NICKNAME_DELETE_SUCCESS]:
        '\n' + `## 닉네임 삭제 완료` +
        '\n' + '> * 닉네임이 성공적으로 삭제되었습니다.' +
        '\n' + '> * 문제가 발생하면 **Wave** 디스코드 채널로 문의해 주세요.'

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