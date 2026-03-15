function formatNicknameByGame(gameType, userInput) {
    if (gameType === "leagueOfLegends" || gameType === "teamfightTactics" || gameType === "valorant") {
        let [nickname, tag] = userInput.split('#');

        nickname = nickname.trim();
        tag = tag.trim();

        // 닉네임이 두 글자일 경우 중간에 공백 삽입
        if (nickname.length === 2)
            nickname = `${nickname[0]} ${nickname[1]}`;

        return `${nickname}#${tag}`;
    } else
        return userInput.trim();

}

module.exports = formatNicknameByGame