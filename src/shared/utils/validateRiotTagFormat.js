const { InvalidRiotTagFormatError } = require('../../utils/errors/errorType');
const RIOT_TAG_REGEX = /^[\p{L}0-9 ]{1,16}#[\p{L}0-9]{1,5}$/u;

/**
 * 닉네임이 라이엇 태그 포맷에 맞는지 검사
 * @param {string} nickname
 * @throws {Error} INVALID_RIOT_TAG_FORMAT
 */
function validateRiotTagFormat(nickname) {
    if (!RIOT_TAG_REGEX.test(nickname)) {
        throw new InvalidRiotTagFormatError();
    }
}

module.exports = validateRiotTagFormat;