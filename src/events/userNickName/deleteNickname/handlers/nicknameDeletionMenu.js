const UserSettings = require('../../../../services/UserSettings');
const createMenu = require('../modules/createMenu');
const createMenuOptions = require('../modules/createMenuOptions');
const stateMessage = require('../modules/stateMessage');
const GAME_TYPES = require('@constants/gameTypes');
const GAME_DISPLAY_NAMES = require('@constants/gameDisplayNames');

function createOptions(userData) {
    const options = [];

    for (const gameType of Object.values(GAME_TYPES)) {
        if (!userData[gameType] || userData[gameType].length === 0) continue;

        userData[gameType].forEach(entry => {
            let nickname = '';
            switch (gameType) {
                case GAME_TYPES.STEAM:
                    nickname = entry.playerName;
                    break;

                case GAME_TYPES.LEAGUE_OF_LEGENDS:
                    nickname = entry.summonerName;
                    break;

                default:
                    nickname = entry;
            }

            const value = JSON.stringify({ gameType, nickname });

            options.push({
                value,
                label: nickname,
                description: GAME_DISPLAY_NAMES[gameType]
            })
        })
    }

    return options;
}

module.exports = async (interaction) => {
    try {
        const userId = interaction.member.id;

        // 유저 인스턴스 생성 및 유저 데이터를 불러옵니다.
        const userSettings = new UserSettings(userId);
        const userData = await userSettings.loadUserData();

        // 유저 데이터가 없으면 메시지를 보냅니다.
        if (!userData) {
            await interaction.reply({
                content: stateMessage('NO_USER_DATA'),
                ephemeral: true
            });
            return;
        };

        // 유저 닉네임 옵션을 생성합니다.
        // const options = createMenuOptions(userData);
        const options = createOptions(userData);


        // 닉네임이 없으면 메시지를 보냅니다.
        if (options.length === 0) {
            await interaction.reply({
                content: stateMessage('NO_NICKNAMES'),
                ephemeral: true
            });
            return;
        };

        // 닉네임 선택 메뉴를 생성합니다.
        const selectMenu = createMenu(options);

        await interaction.reply({
            content: '### 삭제하려는 닉네임을 아래 목록에서 선택해주세요. 🗑️',
            components: [selectMenu],
            ephemeral: true
        });

    } catch (error) {
        console.error('deleteNickname.js 예외 : ', error);
    };
};