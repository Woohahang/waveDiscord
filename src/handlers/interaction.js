/* 관리자 권한 체크 */
const { checkInteractionAdmin } = require('../module/checkAdminPermissionOn');

/* 닉네임 저장 */
const nickNameModal = require('../events/userNickName/nickNameHandlers/nickNameModal');
const nicknameDeleteHandler = require('../events/userNickName/deleteNickname/handlers/nicknameDeleteHandler');
const saveNickName = require('../events/userNickName/nickNameHandlers/saveNickName');

/* 닉네임 삭제 */
const nicknameDeletionMenu = require('../events/userNickName/deleteNickname/handlers/nicknameDeletionMenu');


/* 길드 메뉴 컨트롤 */
const gameMenuToggle = require('../events/guildCreate/guildMenuControls/gameMenuToggle');
const toggleMenuHandler = require('../events/guildCreate/guildMenuControls/toggleMenuHandler');

/* 채널 업데이트 */
const updateChannels = require('../events/guildCreate/update/updateHandler/updateChannels');

/* 멀티 툴 */
const multitools = require('../events/multitools/multitools');

const assignRoleByNick = require('../events/guildAliasTemplates/aliasHandlers/assignRoleByNick');
const setAliasSeparator = require('../events/guildAliasTemplates/aliasHandlers/setAliasSeparator');
const nicknameRoleAssigner = require('../events/guildAliasTemplates/aliasHandlers/nicknameRoleAssigner');
const nicknameTemplateSaver = require('../events/guildAliasTemplates/aliasHandlers/nicknameTemplateSaver');

const viewUserInfo = require('../events/multitools/userInfo/viewUserInfo');
const deleteUserInfo = require('../events/multitools/userInfo/deleteUserInfo');


/* 테스트 기능입니다. */
const profileManager = require('../events/userChannel/profile/handler/profileManager');

module.exports = async (interaction) => {
    try {
        if (!checkInteractionAdmin(interaction)) return; // 봇이 관리자 권한을 받았는지 체크


        if (interaction.isButton()) {
            handleButtonInteraction(interaction);

        } else if (interaction.isModalSubmit()) {
            handleSubmitModal(interaction);

        } else if (interaction.isStringSelectMenu()) {
            await handleStringSelectMenu(interaction);

        } else if (interaction.isChatInputCommand()) {
            await handleChatInputCommand(interaction);
        };

    } catch (error) {
        console.error('interaction.js 예외 : ', error);
    };
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
    try {
        const customId = interaction.customId;

        switch (customId) {
            case 'upDateButton':
                await updateChannels(interaction);
                break;

            case 'removeButton':
                nicknameDeletionMenu(interaction);
                break;

            case 'multitoolsButton':
                multitools(interaction);

                // await profileManager(interaction); // 테스트 기능입니다.
                break;

            default:
                console.log('isButton 에서 알 수 없는 customId : ', customId);
        };
    } catch (error) {
        console.error('interaction.handleButtonInteraction() 예외 : ', error);
    };
};


async function handleSubmitModal(interaction) {
    try {
        const customId = interaction.customId;
        const customIdParts = customId.split('_')[0];

        switch (customIdParts) {
            case 'submitNickname':
                saveNickName(interaction);
                break;

        };
    } catch (error) {
        console.error('interaction.handleSubmitModal() 예외 : ', error);
    };
};

async function handleStringSelectMenu(interaction) {
    try {
        const values = interaction.values;
        const customId = interaction.customId;

        switch (customId) {
            case 'gameMenu': // 닉네임 등록 모달 메뉴 생성
                nickNameModal(interaction);
                break;

            case 'removeNickNames': // 닉네임 삭제 제출 -> DB 저장
                nicknameDeleteHandler(interaction);
                break;

            /* 서버 메뉴 보이기 or 숨기기 */
            case 'adminMenuId':
                // 게임 메뉴 띄우기
                if (values.includes('showMenu') || values.includes('hideMenu'))
                    gameMenuToggle(interaction);

                if (values.includes('aliasTemplates')) // 서버 별명 양식 선택
                    assignRoleByNick(interaction);
                break;

            // 게임 메뉴 DB에 저장하고 서버 채널 업데이트
            case 'showMenu':
            case 'hideMenu':
                toggleMenuHandler(interaction);
                break;

            case 'aliasTemplateSelect': // 서버 별명 문단 나누기 선택
                setAliasSeparator(interaction);
                break;

            case 'aliasSeparatorMenu': // 서버 별명 문단 나누기 선택
                nicknameRoleAssigner(interaction);
                break;

            case 'roleAssignment': // 서버 별명에 대한 역할 설정 및 DB 저장
                nicknameTemplateSaver(interaction);
                break;

            case 'multitoolsMenu':
                if (values.includes('viewUserInfo'))
                    viewUserInfo(interaction);

                if (values.includes('deleteUserInfo'))
                    deleteUserInfo(interaction);
                break;

            default:
                console.log('isMessageComponent 에서 알 수 없는 customId : ', customId);
        };

    } catch (error) {
        console.error('interaction.handleStringSelectMenu() 예외 : ', error);
    };
};