/**
 * guildData 객체에서 특정 값과 일치하는 키들을 배열로 반환합니다.
 *
 * @param {Object} guildData - Mongoose Document 또는 일반 객체
 * @param {*} condition - 필터링할 값 (예: true 또는 false)
 * @returns {string[]} 조건과 일치하는 키들의 배열
 */
function filterKeysByValue(guildData, condition) {
    const obj = guildData.toObject();
    const keys = Object.keys(obj);

    return keys.filter(key => obj[key] === condition);
};

module.exports = filterKeysByValue;