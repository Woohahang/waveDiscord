// events/interactionCreate.js

const { InteractionType } = require('discord.js');

const saveNickname = require('../userManagement/saveNickname.js');
const removeNickname = require('../userManagement/removeNickname.js');
const hideMenu = require('../adminManagement/hideMenu.js');
const upDateButton = require('../adminManagement/upDateButton.js');


const commandFiles = [
    'gameNicknameSelection.js',
    'removeSelectedNickname.js'
];

const executeCommand = async (interaction) => {

};

const executeComponentInteraction = async (interaction) => {

    const action = interaction.customId.split('_')[0]; // customId 예시: actionName_itemId
    switch (action) {
        case 'gameMenu':
            saveNickname(interaction);
            break;

        case 'removeNickNames':
            removeNickname(interaction);
            break;

        case 'removeButton':
            const command = await interaction.client.commands.get('닉네임삭제')
            await command.execute(interaction);
            break;

        default:
            console.log(`알 수 없는 action: ${action} in customId: ${interaction.customId}`);
    }


    // 관리자 채널 이벤트 처리
    if (interaction.isMessageComponent()) {
        // customId에 따른 처리
        if (interaction.customId === 'upDate') {
            upDateButton(interaction);
        }

        // values 배열에 따른 처리
        const selectedValue = interaction.values ? interaction.values[0] : null;
        switch (selectedValue) {
            case 'hideMenu':
                hideMenu(interaction);
                break;

            case 'showMenu':
                interaction.reply({
                    content: '개발 단계입니다.',
                    ephemeral: true
                })
                break;

            case 'changeOrder':
                interaction.reply({
                    content: '개발 단계입니다.',
                    ephemeral: true
                })
                break;
        }
    }
};

const executeModalSubmit = async (interaction) => {
    if (!interaction.isModalSubmit()) return;

    // 예를 들어, customId를 사용하여 다른 처리 수행
    switch (interaction.customId) {
        case 'modalCustomId1':
            // 처리 로직
            break;
        // 다른 customId에 대한 처리 ...
        default:
            console.log(`알 수 없는 customId: ${interaction.customId}`);
    }
};


module.exports = async (interaction) => {
    switch (interaction.type) {
        case InteractionType.ApplicationCommand:
            await executeCommand(interaction);
            break;
        case InteractionType.MessageComponent:
            await executeComponentInteraction(interaction);
            break;
        case InteractionType.ModalSubmit:
            await executeModalSubmit(interaction);
            break;
        default:
            console.error(`알 수 없는 상호 작용 타입: ${interaction.type}`);
    }
};
