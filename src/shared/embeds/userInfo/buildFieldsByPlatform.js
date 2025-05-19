const buildGameFieldValue = require('./buildGameFieldValue');
const platforms = require('@constants/platforms');
const platformNames = require('@constants/platformNames');

/**
 * 유저가 등록한 게임 닉네임 데이터를 기반으로
 * 플랫폼별 디스코드 임베드 필드를 생성합니다.
 *
 * @param {Object} userData - 유저가 등록한 게임별 닉네임 정보
 * @param {Array<string>} gamesWithData - 유저가 닉네임을 등록한 게임 목록
 * @returns {Array<Object>} - 디스코드 임베드 필드 배열
 */
function buildFieldsByPlatform(userData, gamesWithData) {
    const fields = [];

    // 모든 플랫폼(steam, riot 등)을 순회합니다
    Object.keys(platforms).forEach(platform => {
        let value = '';

        // 해당 플랫폼에 포함된 게임 중 닉네임이 등록된 게임만 필터링합니다
        const games = gamesWithData.filter(game => platforms[platform].includes(game));

        // 각 게임의 닉네임 데이터를 문자열로 변환해 누적합니다
        games.forEach(game => {
            const nicknames = userData[game];
            value += buildGameFieldValue(game, nicknames) + '\n';
        });

        // 값이 있으면 필드로 추가합니다
        if (value) {
            fields.push({ name: `** ${platformNames[platform]} ** `, value: value.trim() });
        }
    });

    return fields;
}

module.exports = buildFieldsByPlatform;