/**
 * 유저가 닉네임을 등록한 게임만 필터링하여 반환
 * 
 * @param {string[]} gameTypes - guild 설정에서 활성화된 게임 타입 목록
 * @param {UserData} userData - 유저의 게임 닉네임 정보를 담고 있는 객체
 * @returns {string[]} - 유저가 닉네임을 등록한 게임 타입 목록
 */
function filterAvailableGames(displayedGames, userData) {
    return displayedGames.filter(gameType => userData.hasNickname(gameType));
}

module.exports = filterAvailableGames;