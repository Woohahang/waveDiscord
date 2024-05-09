// interactionCreate.js

const { createNicknameModal } = require('../modals/createNicknameModal');
const { removeNickname } = require('../events/userNickName/removeNickname');
const { toggleMenuHandler } = require('../events/serverManagement/toggleMenuHandler');
const { gameMenuToggle } = require('../events/serverManagement/gameMenuToggle');
const { saveUserNickname } = require('../events/userNickName/saveUserNickname');
const { upDateButton } = require('../events/serverManagement/upDateButton');

async function handleinteraction(interaction) {
    try {
        const customId = interaction.customId;

        let value;
        if (interaction.values) {
            value = interaction.values[0];
        }

        if (interaction.isButton()) {
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
            }
        }

        if (interaction.isModalSubmit()) {

            const customIdParts = customId.split('-');
            const lastPart = customIdParts[customIdParts.length - 1];

            switch (lastPart) {
                case 'submitNickname': // 닉네임 제출 -> DB 저장
                    saveUserNickname(interaction);
            }
        };

        if (interaction.isStringSelectMenu()) {
            switch (customId) {
                case 'gameMenu': // 닉네임 등록 모달 메뉴 생성
                    await createNicknameModal(interaction);
                    break;

                case 'removeNickNames': // 닉네임 삭제 제출 -> DB 저장
                    removeNickname(interaction);
                    break;

                case 'adminMenuId': // 관리자 게임 메뉴
                    if (value === 'changeOrderValue') {
                        interaction.reply({ content: '개발 단계입니다.', ephemeral: true })
                    }
                    else { gameMenuToggle(interaction, value); }
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

    } catch (error) {
        console.error('isMessageComponent 에서 처리 중 오류 발생:', error);
        await interaction.reply({ content: '상호 작용 처리 중 오류가 발생했습니다!', ephemeral: true });
    };
};


module.exports = { handleinteraction };