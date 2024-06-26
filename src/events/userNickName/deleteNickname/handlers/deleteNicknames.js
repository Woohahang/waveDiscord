const UserSettings = require('../../../../services/UserSettings');
const createMenu = require('../modules/createMenu');
const createMenuOptions = require('../modules/createMenuOptions');
const stateMessage = require('../modules/stateMessage');

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
        const options = createMenuOptions(userData);

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