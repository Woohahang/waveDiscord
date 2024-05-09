// interactionCreate.js

const { checkInteractionAdmin } = require('../module/checkAdminPermissionOn')

const { createNicknameModal } = require('../modals/createNicknameModal');
const { removeNickname } = require('../events/userNickName/removeNickname');
const { toggleMenuHandler } = require('../events/serverManagement/toggleMenuHandler');
const { gameMenuToggle } = require('../events/serverManagement/gameMenuToggle');
const { saveUserNickname } = require('../events/userNickName/saveUserNickname');
const { upDateButton } = require('../events/serverManagement/upDateButton');

const { checkAdminRole } = require('../module/checkAdminRole');


async function handleinteraction(interaction) {
    try {
        if (!checkInteractionAdmin(interaction)) return;

        const customId = interaction.customId;

        let value;
        if (interaction.values) {
            value = interaction.values[0];
        };

        if (interaction.isButton()) {
            handleButtonInteraction(interaction, customId);

        } else if (interaction.isModalSubmit()) {
            handleSubmitModal(interaction, customId);

        } else if (interaction.isStringSelectMenu()) {
            await handleStringSelectMenu(interaction, customId, value);

        }
    } catch (error) {
        console.error('isMessageComponent 에서 처리 중 오류 발생:', error);
        await interaction.reply({ content: '상호 작용 처리 중 오류가 발생했습니다!', ephemeral: true });
    };
};

async function handleButtonInteraction(interaction, customId) {
    switch (customId) {
        case 'upDate':
            upDateButton(interaction);
            break;

        case 'removeButton':
            const command = await interaction.client.commands.get('닉네임삭제')
            await command.execute(interaction);
            break;

        default:
            console.log('isButton 에서 알 수 없는 customId : ' + customId);
    };
};

async function handleSubmitModal(interaction, customId) {
    const customIdParts = customId.split('-');
    const lastPart = customIdParts[customIdParts.length - 1];

    switch (lastPart) {
        case 'submitNickname': // 닉네임 제출 -> DB 저장
            saveUserNickname(interaction);
    };
};

async function handleStringSelectMenu(interaction, customId, value) {
    switch (customId) {
        case 'gameMenu': // 닉네임 등록 모달 메뉴 생성
            await createNicknameModal(interaction);
            break;

        case 'removeNickNames': // 닉네임 삭제 제출 -> DB 저장
            removeNickname(interaction);
            break;

        case 'adminMenuId': // 관리자 게임 메뉴
            if (checkAdminRole(interaction)) {
                if (value === 'changeOrderValue') {
                    interaction.reply({ content: '개발 단계입니다.', ephemeral: true });
                }
                else { gameMenuToggle(interaction, value); };
            } else {
                // 권한이 없을 경우 사용자에게 알림
                interaction.reply({ content: '관리자 메뉴에 접근할 권한이 없습니다.', ephemeral: true });
            };
            break;

        case 'showMenuHandler': // 메뉴 숨기기 -> DB 저장 
            toggleMenuHandler(interaction, 'showMenu');
            break;

        case 'hideMenuHandler': // 메뉴 보이기 -> DB 저장
            toggleMenuHandler(interaction, 'hideMenu');
            break;

        default:
            console.log('isMessageComponent 에서 알 수 없는 customId : ' + customId);
    };
};



module.exports = { handleinteraction };