const { StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const UserSettings = require('@services/UserSettings');
const { GAME_TYPES } = require('@constants/gameTypes');
const GAME_DISPLAY_NAMES = require('@constants/gameDisplayNames');
const logger = require('@utils/logger');
const STATE_KEYS = require('@constants/stateKeys');
const sendStateMessage = require('@utils/discord/sendStateMessage');

function createOptions(userDoc) {
    const options = [];

    for (const gameType of Object.values(GAME_TYPES)) {
        if (!userDoc[gameType] || userDoc[gameType].length === 0) continue;

        userDoc[gameType].forEach(entry => {
            let nickname = '';
            switch (gameType) {
                case GAME_TYPES.STEAM:
                case GAME_TYPES.LEAGUE_OF_LEGENDS:
                    nickname = entry.nickname;
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

function createNicknameDeleteMenu(options) {
    return new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('removeNickNames')
                .setPlaceholder('선택하세요!')
                .addOptions(options)
                .setMinValues(1)
                .setMaxValues(options.length)
        );
};

module.exports = async (interaction) => {

    const userId = interaction.member.id;

    try {
        // 유저 인스턴스 생성 및 유저 데이터를 불러옵니다.
        const userSettings = new UserSettings(userId);
        const userDoc = await userSettings.loadDoc();
        if (!userDoc) return await sendStateMessage(interaction, STATE_KEYS.NO_USER_DATA);

        // 유저 닉네임 옵션을 생성합니다.
        const options = createOptions(userDoc);
        if (options.length === 0) return await sendStateMessage(interaction, STATE_KEYS.NO_NICKNAMES);

        // 닉네임 선택 메뉴를 생성합니다.
        const selectMenu = createNicknameDeleteMenu(options);

        await interaction.reply({
            content: '### 삭제하려는 닉네임을 아래 목록에서 선택해주세요. 🗑️',
            components: [selectMenu],
            ephemeral: true
        });

    } catch (error) {
        logger.error('[deleteNicknameMenu] 닉네임 삭제를 위한 메뉴 구성중 오류', {
            userId: interaction.member.id,
            stack: error.stack
        })
    };
};