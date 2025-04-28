// errorMessage.js

const invalidProfileLink =
    '\n' + `## 프로필 주소 등록 실패` +
    '\n' + '> * 스팀 프로필 주소가 아닙니다.' +
    '\n' + '> * 📌 ① 스팀 페이지 프로필  ② 좌측 상단의 주소 복사 붙여넣기';

const userProfileNotFound =
    '\n' + `## 프로필 주소 등록 실패` +
    '\n' + '> * 유저 정보를 찾을 수 없습니다.' +
    '\n' + '> * 문제가 지속되면 **Wave** 디스코드 채널로 문의해 주세요.';

function errorMessage(code) {
    try {
        let message;
        switch (code) {
            case 'INVALID_PROFILE_LINK':
                message = invalidProfileLink;
                break;

            case 'USER_PROFILE_NOT_FOUND':
                message = userProfileNotFound;
                break;

            default:
                message = '알 수 없는 오류로 인해 처리하지 못 했습니다.';
        };

        return message;
    } catch (error) {
        console.error('errorMessage.js 예외 : ', error);
    }
};

module.exports = errorMessage;