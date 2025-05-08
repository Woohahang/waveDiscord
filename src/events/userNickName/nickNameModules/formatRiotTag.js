/**
 * Riot Tag를 포맷팅합니다.
 * 
 * - 'KR1' 태그는 대문자로 통일
 * - 닉네임이 2글자일 경우 중간에 공백 추가
 * 
 * @param {string} nickname - '닉네임#태그' 형식의 문자열
 * @returns {string} 포맷팅된 Riot Tag
 */
function formatRiotTag(nickname) {
    let [name, tag] = nickname.split('#');

    // 'kr1' 또는 'kR1' 등은 'KR1'로 통일
    if (tag.toUpperCase() === 'KR1')
        tag = 'KR1';

    // 닉네임이 두 글자일 경우 중간에 공백 삽입
    if (name.length === 2)
        name = `${name[0]} ${name[1]}`;

    return `${name}#${tag}`;
};

module.exports = formatRiotTag;