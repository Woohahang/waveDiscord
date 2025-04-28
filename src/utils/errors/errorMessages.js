const invalidProfileLink =
    '\n' + `## 프로필 주소 등록 실패` +
    '\n' + '> * 스팀 프로필 주소가 아닙니다.' +
    '\n' + '> * 📌 ① 스팀 페이지 프로필  ② 좌측 상단의 주소 복사 붙여넣기';

const userProfileNotFound =
    '\n' + `## 프로필 주소 등록 실패` +
    '\n' + '> * 유저 정보를 찾을 수 없습니다.' +
    '\n' + '> * 문제가 지속되면 **Wave** 디스코드 채널로 문의해 주세요.';

const invalidRiotTagFormat =
    '\n' + `## 닉네임 등록 실패` +
    '\n' + '> * 라이엇 태그 형식이 잘못되었습니다.' +
    '\n' + '> * 문제가 지속되면 **Wave** 디스코드 채널로 문의해 주세요.';

const errorMessages = {
    'INVALID_PROFILE_LINK': invalidProfileLink,
    'USER_PROFILE_NOT_FOUND': userProfileNotFound,
    'INVALID_RIOT_TAG_FORMAT': invalidRiotTagFormat,

};

module.exports = errorMessages;