/**
 * 유스케이스 실행 결과 중 "정상 흐름"에 해당하는 상태 코드를 정의합니다.
 *
 * ❗ 핵심 기준
 * - "에러가 아닌 결과"를 표현합니다.
 * - 실패가 아닌 "상태" 또는 "결과 안내"입니다.
 *
 * ❗ 분류 기준 (중요)
 * - "누가 했냐" (USER) 기준이 아니라
 * - "무엇에 대한 상태냐" (도메인 기준)로 나눕니다.
 *
 * 예시:
 * - USER → 유저 데이터 상태
 * - NICKNAME → 닉네임 기능 상태
 * - ADMIN → 권한 상태
 * - MENU → UI 상태
 * - GUILD → 길드 설정 상태
*/
const STATE_KEYS = {
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    NO_NICKNAMES: 'NO_NICKNAMES',
    DELETE_FAIL: 'DELETE_FAIL',
    NICKNAME_DELETE_SUCCESS: 'NICKNAME_DELETE_SUCCESS',
    NO_MENU_TO_SHOW: 'NO_MENU_TO_SHOW',
    NO_MENU_TO_HIDE: 'NO_MENU_TO_HIDE',
    SETUP_COMPLETE_MESSAGE: 'SETUP_COMPLETE_MESSAGE',


    /**
     * ADMIN
     * 
     * 권한(Authorization) 관련 상태를 나타냅니다.
    */
    ADMIN: {
        NO_PERMISSION: 'NO_ADMIN_PERMISSION',       // 관리자 권한 없음
    },

    /**
     * MENU
     *
     * UI/메뉴 상태 관련 결과를 나타냅니다.
    */
    MENU: {
        NO_MENU_TO_SHOW: 'NO_MENU_TO_SHOW', // 표시할 메뉴 없음
        NO_MENU_TO_HIDE: 'NO_MENU_TO_HIDE', // 숨길 메뉴 없음
    },

    /**
     * GUILD
     *
     * 길드 설정 및 관리 관련 상태를 나타냅니다.
    */
    GUILD: {
        UPDATE_SUCCESS: 'GUILD_UPDATE_SUCCESS',       // 길드 설정 업데이트 성공
        SETUP_COMPLETE: 'SETUP_COMPLETE_MESSAGE',     // 초기 셋업 완료
    },

};

module.exports = STATE_KEYS;