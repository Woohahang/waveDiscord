const buildFieldsByPlatform = require('./buildFieldsByPlatform');
const filterKeysByValue = require('../../shared/utils/filterKeysByValue');

/**
 * 유저 데이터와 길드 설정을 기반으로 디스코드 임베드 필드를 생성합니다.
 * 
 * - 길드 설정에 따라 표시할 게임 목록을 필터링하고,
 *   유저가 닉네임을 등록한 게임만 골라서
 *   플랫폼별 필드 형태로 구성합니다.
 * 
 * @param {Object} userData - 유저의 게임 닉네임 정보가 담긴 객체
 * @param {Object} guildData - 길드의 필터 설정이 담긴 객체
 * @returns {Array<Object>|null} 디스코드 임베드에 사용될 필드 배열, 또는 닉네임 정보가 없을 경우 null
 */
function buildUserAndGuildFields(userData, guildData) {
    try {
        // 길드 설정에 따라 표시할 게임 목록을 필터링합니다.
        const displayedGames = filterKeysByValue(guildData, true);

        // 유저가 닉네임을 등록한 게임들만 필터링합니다.
        const gamesWithData = displayedGames.filter(key => userData[key]?.length > 0);

        // 플랫폼별 필드를 생성합니다.
        const fields = buildFieldsByPlatform(userData, gamesWithData);

        // 필드가 존재하면 반환하고, 없으면 null 반환
        return fields.length > 0 ? fields : null;

    } catch (error) {
        console.error('buildEmbedFields 예외 발생', error);
    }
}

module.exports = buildUserAndGuildFields;