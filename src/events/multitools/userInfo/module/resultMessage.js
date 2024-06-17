const deleteSuccess =
    '## 사용자 정보 삭제\n' +
    '> * 사용자 정보가 성공적으로 삭제되었습니다.\n' +
    '> * 닉네임을 등록하면 **Wave**는 언제나 다시 사용할 수 있습니다.';

const alreadyDeleted =
    '## 사용자 정보 찾을 수 없음\n' +
    '> * 사용자의 정보를 찾을 수 없습니다.\n' +
    '> * 문제가 지속될 경우, **Wave** 디스코드를 방문해 주세요.';

const deleteError =
    '## 문제 발생\n' +
    '> * 사용자 정보를 삭제하는 중 오류가 발생했습니다.\n' +
    '> * 문제가 지속될 경우, **Wave** 디스코드를 방문해 주세요.';

module.exports = { deleteSuccess, alreadyDeleted, deleteError };