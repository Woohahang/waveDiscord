/**
 * 조건에 따라 길드 설정에서 활성화된 게임 목록 또는 비활성화된 게임 목록을 반환합니다.
 * 
 * @param {import('@dtos/GuildConfigDto')} guildConfig - 길드 설정 객체 (게임 활성화 상태 정보를 포함)
 * @param {boolean} condition - true면 활성화된 게임 목록, false면 비활성화된 게임 목록 반환
 * @returns {string[]} 활성화 혹은 비활성화된 게임 키들의 배열
 */
function getGamesByCondition(guildConfig, condition) {
    if (condition) return guildConfig.getEnabledGames();
    else return guildConfig.getDisabledGames();
}

module.exports = getGamesByCondition;