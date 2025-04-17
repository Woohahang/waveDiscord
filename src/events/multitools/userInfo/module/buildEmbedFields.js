const platforms = require('../../../../constants/platforms');
const buildFieldsByPlatform = require('./buildFieldsByPlatform');

/**
 * 유저 데이터를 기반으로 디스코드 임베드에 들어갈 필드를 생성합니다.
 *
 * @param {Object} userData - 유저의 게임 닉네임 정보가 포함된 객체
 * @returns {Array|null} 디스코드 임베드 필드 배열 또는 null (데이터 없음)
 */
function buildEmbedFields(userData) {
    try {
        // 등록된 모든 게임 키를 추출합니다 (2차원 배열 → 1차원으로 평탄화)
        const allGameKeys = Object.values(platforms).flat();

        // 유저가 닉네임을 등록한 게임들만 필터링합니다
        const gamesWithData = allGameKeys.filter(key => userData[key].length > 0);

        // 필터링된 게임 데이터를 바탕으로 플랫폼별 임베드 필드를 생성합니다
        const fields = buildFieldsByPlatform(userData, gamesWithData);

        // 생성된 필드가 존재하면 반환하고, 없으면 null을 반환합니다
        return fields.length > 0 ? fields : null;

    } catch (error) {
        console.error('buildEmbedFields 예외 발생', error);
    }
};

module.exports = buildEmbedFields;