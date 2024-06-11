// requiresUpdateField.js

const title = '⚠️ 이모지 업로드 알림';
const message =
    '안녕하세요, Wave 사용자 여러분 ! 😊' + '\n\n'
    + '📌 현재 서버에 Wave 이모지가 누락 되어 있습니다.' + '\n'
    + '📌 관리자님, 업데이트 버튼을 눌러 이모지를 업로드 해주세요 !';

function requiresUpdateField() {
    return ({ name: title, value: message });
};

module.exports = requiresUpdateField;