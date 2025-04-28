const { InvalidRiotTagFormatError } = require('../../utils/errors/errorType');

/**
 * 라이엇 태그 포맷을 검사하기 위한 정규 표현식
 * 
 * 형식: '닉네임#태그' 형태로, 닉네임은 최대 16자, 태그는 최대 5자까지 가능
 */
const RIOT_TAG_REGEX = /^[\p{L}0-9 ]{1,16}#[\p{L}0-9]{1,5}$/u;

/**
 * 닉네임이 라이엇 태그 포맷에 맞는지 검사
 * 
 * @param {string} nickname
 * @throws {Error} INVALID_RIOT_TAG_FORMAT
 */
function validateRiotTagFormat(nickname) {

    if (!RIOT_TAG_REGEX.test(nickname)) {
        throw new InvalidRiotTagFormatError();
    }
}

module.exports = validateRiotTagFormat;