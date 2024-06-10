// statusMessage.js

const saveSuccess =
    '\n' + `## 닉네임 등록 완료` +
    '\n' + '> * 음성 채널 입장 후 채팅을 열어보세요 !' +
    '\n' + '> * **Wave** 가 사용자 정보를 보여줍니다 !';

const nicknameLimitExceeded =
    '\n' + `## 닉네임 등록 실패` +
    '\n' + '> * 해당 게임은 저장할 수 있는 닉네임 개수를 초과했습니다.' +
    '\n' + '> * 문제가 지속되면 **Wave** 디스코드 채널로 문의해 주세요.';

const nicknameDuplicate =
    '\n' + `## 닉네임 등록 실패` +
    '\n' + '> * 중복 된 닉네임이 있습니다.' +
    '\n' + '> * 문제가 지속되면 **Wave** 디스코드 채널로 문의해 주세요.';

const removeNickName =
    '\n' + `## 닉네임 삭제 완료` +
    '\n' + '> * 닉네임이 성공적으로 삭제되었습니다.' +
    '\n' + '> * 문제가 발생하면 **Wave** 디스코드 채널로 문의해 주세요.';

const removeUserInfo =
    '\n' + `## 닉네임 및 유저 정보 삭제 완료` +
    '\n' + '> * **모든 닉네임**이 성공적으로 **삭제**되었습니다.' +
    '\n' + '> * **유저 정보**도 함께 **삭제**되었습니다.';

function statusMessage(status) {
    try {
        let message;
        switch (status) {
            case 'nicknameDuplicate':
                message = nicknameDuplicate;
                break;

            case 'nicknameLimitExceeded':
                message = nicknameLimitExceeded;
                break;

            case 'saveSuccess':
                message = saveSuccess;
                break;

            case 'removeNickName':
                message = removeNickName;
                break;

            case 'removeUserInfo':
                message = removeUserInfo;
                break;

            default:
                message = '알 수 없는 오류로 인해 처리하지 못 했습니다.';
        };
        return message;
    } catch (error) {
        console.error('statusMessage.js 예외 : ', error);
    };
};

module.exports = statusMessage;