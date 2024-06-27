// formatRiotTag.js

function formatRiotTag(nickName) {
    try {
        // 태그가 없다면 #KR1 추가
        if (!nickName.includes('#')) {
            nickName += '#KR1';
        };

        // 태그 이름을 대문자로 변환
        let [namePart, riotTag] = nickName.split('#');
        let upperCaseTag = riotTag.toUpperCase();

        // kr1, kR1 -> KR1 변환
        if (upperCaseTag === 'KR1') {
            riotTag = upperCaseTag;
        };

        // 두 글자 닉네임에 대해 가운데에 띄어쓰기 추가
        if (namePart.length === 2) {
            namePart = namePart[0] + ' ' + namePart[1];
        };

        nickName = namePart + '#' + riotTag;

        return nickName;
    } catch (error) {
        console.error('formatRiotTag.js 예외 : ', error);
    };
};

module.exports = formatRiotTag;