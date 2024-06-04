// filterOptions.js

// guildData 객체에서 값이 true 만 가지고 옵니다.
function filterOptions(guildData, condition) {
    // 객체를 가져옵니다.
    const obj = guildData.toObject();

    // 객체의 모든 키를 배열로 가져옵니다.
    const keys = Object.keys(obj);

    // true 만 필터링합니다.
    return keys.filter(key => obj[key] === condition);
};

module.exports = filterOptions;