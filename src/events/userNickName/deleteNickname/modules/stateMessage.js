function stateMessage(state) {
    let content = '';
    switch (state) {
        case 'NO_USER_DATA':
            content =
                '## 유저 정보 없음' + '\n' +
                '> * 유저 정보를 찾을 수 없습니다.' + '\n' +
                '> * 문제가 지속되면 **Wave** 디스코드 채널로 문의해 주세요.';
            break;
        case 'NO_NICKNAMES':
            content =
                '## 등록된 닉네임 없음' + '\n' +
                '> * 현재 등록된 닉네임이 없습니다.' + '\n' +
                '> * 문제가 지속되면 **Wave** 디스코드 채널로 문의해 주세요.';
            break;
    };

    return content;
};

module.exports = stateMessage;