const platforms = require('../../constants/platforms');
const buildFieldsByPlatform = require('./buildFieldsByPlatform');

/**
 * 유저 데이터를 기반으로 디스코드 임베드에 들어갈 필드를 생성합니다.
 * 
 * - 등록된 플랫폼과 게임 목록을 기준으로
 *   유저가 닉네임을 등록한 게임만 필터링하여
 *   플랫폼별 필드 형태로 구성합니다.
 *
 * @param {Object} userData - 유저의 게임 닉네임 정보가 담긴 객체
 * @returns {Array<Object>|null} 디스코드 임베드에 사용될 필드 배열, 또는 닉네임 정보가 없을 경우 null
 */
function buildUserDataFields(userData) {
    try {
        // 모든 플랫폼의 게임 키를 평탄화하여 가져옵니다.
        const allGameKeys = Object.values(platforms).flat();

        // 유저가 닉네임을 등록한 게임들만 필터링합니다.
        const gamesWithData = allGameKeys.filter(key => userData[key]?.length > 0);

        // 플랫폼별 필드를 생성합니다.
        const fields = buildFieldsByPlatform(userData, gamesWithData);

        // 필드가 존재하면 반환하고, 없으면 null 반환
        return fields.length > 0 ? fields : null;

    } catch (error) {
        console.error('buildEmbedFields 예외 발생', error);
    }
}

module.exports = buildUserDataFields;