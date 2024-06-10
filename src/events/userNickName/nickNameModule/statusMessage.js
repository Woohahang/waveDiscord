// statusMessage.js

function statusMessage(status) {
    let message;
    switch (status) {
        case 'nicknameDuplicate':
            message = '중복 된 닉네임이 있습니다.';
            break;

        case 'nicknameLimitExceeded':
            message = '해당 게임은 저장할 수 있는 닉네임 개수를 초과했습니다.';
            break;

        case 'saveSuccess':
            message = '닉네임 등록 완료 !';
            break;

        default:
            message = '알 수 없는 오류로 인해 처리하지 못 했습니다.';
            break;
    };
    return message;
};

module.exports = statusMessage;