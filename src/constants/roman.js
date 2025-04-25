const romanMap = {
    I: 'Ⅰ',
    II: 'Ⅱ',
    III: 'Ⅲ',
    IV: 'Ⅳ',
};

function toPrettyRoman(rank) {
    return romanMap[rank.toUpperCase()] || rank;
}

module.exports = { romanMap, toPrettyRoman };