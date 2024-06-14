// 초기 상태 객체 정의
let state = {
    aliasPatterns: [],  // 서버 닉네임 패턴을 저장하는 배열
    aliasSeparator: '', // 서버 닉네임 구분자를 저장하는 문자열
    aliasRoleId: ''     // 서버 닉네임 역할 ID를 저장하는 문자열
};

// 현재 상태를 반환하는 함수
const getState = () => state;

// 상태를 업데이트하는 함수
// 기존 상태를 새로운 상태로 덮어쓰지 않고 병합하여 업데이트함
const setState = (newState) => {
    state = { ...state, ...newState };
};

// 상태를 초기화하는 함수
const resetState = () => {
    state = {
        aliasPatterns: [],
        aliasSeparator: '',
        aliasRoleId: ''
    };
};

// getState와 setState 함수를 모듈로 내보냄
module.exports = { getState, setState, resetState };