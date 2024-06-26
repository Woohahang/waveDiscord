const { games, description } = require('../../../../module/games/gameData');

/**
 * 사용자 데이터를 기반으로 메뉴 옵션을 생성하는 함수입니다.
 * @param {Object} userData - 사용자의 게임 데이터 객체입니다.
 * @returns {Array} - 메뉴 옵션 객체의 배열입니다.
 */
function createMenuOptions(userData) {
    const options = []; // 결과 옵션을 저장할 배열입니다.

    // 각 게임에 대해 반복합니다.
    games.forEach(game => {
        const userGameData = userData[game]; // 현재 게임에 대한 사용자 데이터를 가져옵니다.

        // 해당 게임에 닉네임이 있는 경우에만 처리합니다.
        if (userGameData && userGameData.length > 0) {

            // 사용자 데이터 배열을 순회하며 각 닉네임에 대해 처리합니다.
            userGameData.forEach(nickname => {
                // 스팀 게임의 경우 닉네임 객체에서 playerName 속성을 사용합니다.
                const playerName = game === 'steam' ? nickname.playerName : nickname;
                options.push({
                    value: `${game}:${playerName}`, // 옵션의 값은 "게임명:닉네임" 형식입니다.
                    label: playerName,  // 옵션의 라벨은 닉네임입니다.
                    description: description[game] // 옵션의 설명은 게임 이름입니다.
                });
            });

        };

    });

    // 생성된 옵션 배열을 반환합니다.
    return options;
}

module.exports = createMenuOptions;
