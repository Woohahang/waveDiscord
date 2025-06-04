const MESSAGE_KEYS = require('@constants/messageKey');

const messageMap = {
    [MESSAGE_KEYS.RANK_GAME_SELECT]:
        '## 게임 선택하기 🎮\n' +
        '> * 서버 친구들의 티어가 궁금하다면?\n' +
        '> * 아래에서 게임을 골라보세요! **Wave**가 바로 보여드립니다.',

    [MESSAGE_KEYS.RANK_RANKING_RESULT]:
        '## 랭킹 결과\n' +
        '> * 선택한 게임의 랭킹입니다!\n' +
        '> * **Wave**가 자동으로 티어 정보를 주기적으로 갱신하고 있어요.\n' +
        '> * 지금 바로 서버 친구들의 티어를 확인해보세요!',
};

function getMessageByKey(key) {
    if (!MESSAGE_KEYS[key])
        throw new Error(`[getMessageByKey] 메시지 키를 찾을 수 없습니다. | key: ${key}`);
    return messageMap[key];
}

module.exports = getMessageByKey;