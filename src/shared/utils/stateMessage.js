const STATE_KEYS = require('@constants/stateKeys');
const ERROR_KEY = require('@constants/errorKeys');

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

    [ERROR_KEY.NICKNAME_SAVE_DUPLICATE]:
        '\n' + `## 닉네임 등록 실패` +
        '\n' + '> * 중복 된 닉네임이 있습니다.' +
        '\n' + '> * 문제가 지속되면 **Wave** 디스코드 채널로 문의해 주세요.',

    [STATE_KEYS.NICKNAME_DELETE_SUCCESS]:
        '\n' + `## 닉네임 삭제 완료` +
        '\n' + '> * 닉네임이 성공적으로 삭제되었습니다.' +
        '\n' + '> * 문제가 발생하면 **Wave** 디스코드 채널로 문의해 주세요.',

    [ERROR_KEY.INVALID_RIOT_TAG_FORMAT]:
        '\n' + `## 닉네임 등록 실패` +
        '\n' + '> * 라이엇 태그 형식이 잘못되었습니다.' +
        '\n' + '> * 문제가 지속되면 **Wave** 디스코드 채널로 문의해 주세요.',

    [ERROR_KEY.NICKNAME_SAVE_FAILED]:
        '\n' + `## 닉네임 등록 실패` +
        '\n' + '> * 닉네임 정보를 저장하는 중 알 수 없는 오류가 발생했습니다.' +
        '\n' + '> * 잠시 후 다시 시도해 주세요.' +
        '\n' + '> * 문제가 지속되면 **Wave** 디스코드 채널로 문의해 주세요.',

    [ERROR_KEY.INVALID_STEAM_PROFILE_LINK]:
        '\n' + `## 프로필 주소 등록 실패` +
        '\n' + '> * 스팀 프로필 주소가 아닙니다.' +
        '\n' + '> * 📌 ① 스팀 페이지 프로필  ② 좌측 상단의 주소 복사 붙여넣기',

    [STATE_KEYS.NO_ADMIN_PERMISSION]:
        '\n' + `## 관리자 기능 접근 실패` +
        '\n' + '> * 서버 관리자가 아닙니다.' +
        '\n' + '> * 문제가 지속되면 **Wave** 디스코드 채널로 문의해 주세요.',

    [ERROR_KEY.UNKNOWN_MENU_SELECTION]:
        '\n' + `## 잘못된 요청` +
        '\n' + '> * 메뉴를 다시 열어 시도해 주세요.' +
        '\n' + '> * 문제가 지속되면 **Wave** 디스코드 채널로 문의해 주세요.',

    [STATE_KEYS.NO_MENU_TO_SHOW]:
        '## 모든 메뉴 표시 중\n' +
        '> * 모든 게임 메뉴가 이미 표시되고 있습니다.' +
        '\n' + '> * 문제가 지속되면 **Wave** 디스코드 채널로 문의해 주세요.',

    [STATE_KEYS.NO_MENU_TO_HIDE]:
        '## 숨길 메뉴 없음\n' +
        '> * 현재 모든 메뉴가 숨김 상태입니다.' +
        '\n' + '> * 문제가 지속되면 **Wave** 디스코드 채널로 문의해 주세요.',

    [ERROR_KEY.GUILD_UPDATE_FAILED]:
        '\n' + '## 업데이트 실패' +
        '\n' + '> * 잠시 후  `/셋업`  명령어를 시도해주세요.' +
        '\n' + '> * 문제가 지속되면 Wave 디스코드 채널로 문의해 주세요.',

    [STATE_KEYS.GUILD_UPDATE_SUCCESS]:
        '\n' + '## 업데이트 완료' +
        '\n' + '> * 현재 **Wave** 는 보완과 개발 단계에 있습니다. ' +
        '\n' + '> * 개발은 지금도 진행 중이며 가끔 업데이트 버튼을 눌러주세요.',

    [STATE_KEYS.SETUP_COMPLETE_MESSAGE]:
        '## 셋업 완료' + '\n' +
        '> * **Wave 채널**과 **Wave 관리자 채널**의 설정이 완료 되었습니다.' + '\n' +
        '> * 이 명령어는 관리자만 사용할 수 있습니다.'

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