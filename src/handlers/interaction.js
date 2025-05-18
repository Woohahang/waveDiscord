// 닉네임 관련
const submitNicknameModal = require('@modules/nicknameFlow/handlers/submitNicknameModal');
const deleteNickname = require('@modules/nicknameFlow/handlers/deleteNickname');
const submitNickname = require('@modules/nicknameFlow/handlers/submitNickname');
const deleteNicknameMenu = require('@modules/nicknameFlow/handlers/deleteNicknameMenu');

// 서버 설정 관련
const gameMenuToggle = require('@modules/guildMenuControls/gameMenuToggle');
const toggleMenuHandler = require('@modules/guildMenuControls/toggleMenuHandler');
const onGuildUpdateButtonPressed = require('@modules/guildUpdate/onGuildUpdateButtonPressed');

// 유저 정보
const showUserInfo = require('@modules/userInfo/showUserInfo');
const createUserInfoSelectMenu = require('@modules/userInfo/createUserInfoSelectMenu');
const deleteUserInfo = require('@modules/userInfo/deleteUserInfo');

// 유틸
const isBotAdmin = require('@utils/discord/isBotAdmin');
const logger = require('@utils/logger');

module.exports = async (interaction) => {
    if (!isBotAdmin(interaction.guild)) return;

    if (interaction.isButton()) {
        await handleButtonInteraction(interaction);

    } else if (interaction.isModalSubmit()) {
        await handleSubmitModal(interaction);

    } else if (interaction.isStringSelectMenu()) {
        await handleStringSelectMenu(interaction);

    } else if (interaction.isChatInputCommand()) {
        await handleChatInputCommand(interaction);
    }

    else {
        logger.error('[interaction] Unknown interaction type', {
            type: interaction.type,
            user: interaction.user?.tag,
            customId: interaction.customId,
            commandName: interaction.commandName,
        })
    }
};

async function handleChatInputCommand(interaction) {
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) { return console.log('commandName 을 찾을 수 없습니다.') };

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: '이 명령을 실행하는 동안 오류가 발생했습니다!', ephemeral: true });
        } else {
            await interaction.reply({ content: '이 명령을 실행하는 동안 오류가 발생했습니다!', ephemeral: true });
        };
    };
};


async function handleButtonInteraction(interaction) {
    const customId = interaction.customId;

    switch (customId) {
        case 'upDateButton':
            await onGuildUpdateButtonPressed(interaction);
            break;

        case 'removeButton':
            await deleteNicknameMenu(interaction);
            break;

        case 'multitoolsButton':
            await createUserInfoSelectMenu(interaction);
            break;

        default:
            logger.error('[interaction.handleButtonInteraction] Unknown customId', {
                customId
            });
    }
}


async function handleSubmitModal(interaction) {
    const customId = interaction.customId;
    const customIdParts = customId.split('_')[0];

    switch (customIdParts) {
        case 'submitNickname':
            await submitNickname(interaction);
            break;

        default:
            logger.error('[interaction.handleSubmitModal] Unknown customIdParts', {
                customId,
                customIdParts
            })
    };
};

async function handleStringSelectMenu(interaction) {
    const values = interaction.values;
    const customId = interaction.customId;

    switch (customId) {
        case 'gameMenu': // 닉네임 등록 모달 메뉴 생성
            await submitNicknameModal(interaction);
            break;

        case 'removeNickNames': // 닉네임 삭제 제출 -> DB 저장
            await deleteNickname(interaction);
            break;

        /* 서버 메뉴 보이기 or 숨기기 */
        case 'adminMenuId':
            // 게임 메뉴 띄우기
            if (values.includes('showMenu') || values.includes('hideMenu'))
                await gameMenuToggle(interaction);
            break;

        // 게임 메뉴 DB에 저장하고 서버 채널 업데이트
        case 'showMenu':
        case 'hideMenu':
            await toggleMenuHandler(interaction);
            break;

        case 'multitoolsMenu':
            if (values.includes('showUserInfo'))
                await showUserInfo(interaction);

            if (values.includes('deleteUserInfo'))
                await deleteUserInfo(interaction);
            break;

        default:
            logger.error('[interaction.handleStringSelectMenu] Unknown customId', {
                customId,
                values
            })
    };

};