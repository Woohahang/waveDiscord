// interactionCreate.js

/* 관리자 권한 체크 */
const { checkInteractionAdmin } = require('../module/checkAdminPermissionOn')

const createNicknameModal = require('../events/userNickName/createNicknameModal');
const removeNickname = require('../events/userNickName/removeNickname');
// const { toggleMenuHandler } = require('../events/serverManagement/toggleMenuHandler');
// const { gameMenuToggle } = require('../events/serverManagement/gameMenuToggle');
const saveUserNickname = require('../events/userNickName/saveUserNickname');
const { checkAdminRole } = require('../module/checkAdminRole');

/* 길드 메뉴 컨트롤 */
const gameMenuToggle = require('../events/guildCreate/guildMenuControls/gameMenuToggle');
const toggleMenuHandler = require('../events/guildCreate/guildMenuControls/toggleMenuHandler');

/* 채널 업데이트 */
const updateChannels = require('../events/guildCreate/update/updateChannels');

/* 멀티 툴 */
const multitools = require('../events/multitools/multitools');

/* 팀 섞기 */
const teamShuffler = require('../events/multitools/teamShuffler/teamShuffler');
const { excludeMembers } = require('../events/multitools/teamShuffler/excludeMembers');
const { teamEmbedDelete } = require('../events/multitools/teamShuffler/teamEmbedDeleteHandler');
const teamShufflerHandler = require('../events/multitools/teamShuffler/teamShufflerHandler');
const showTeamNumberModal = require('../events/multitools/teamShuffler/showTeamNumberModal');
const teamReshuffle = require('../events/multitools/teamShuffler/teamReshuffle');

const teamShufflerMap = new Map();

async function handleinteraction(interaction) {
    try {
        if (!checkInteractionAdmin(interaction)) return; // 봇이 관리자 권한을 받았는지 체크
        const customId = interaction.customId;

        let values;
        if (interaction.values) {
            values = interaction.values;
        };

        if (interaction.isButton()) {
            handleButtonInteraction(interaction, customId, values);

        } else if (interaction.isModalSubmit()) {
            handleSubmitModal(interaction, customId, values);

        } else if (interaction.isStringSelectMenu()) {
            await handleStringSelectMenu(interaction, customId, values);

        } else if (interaction.isChatInputCommand()) {
            await handleChatInputCommand(interaction);
        };

    } catch (error) {
        console.error('isMessageComponent 에서 처리 중 오류 발생:', error);
        await interaction.reply({ content: '상호 작용 처리 중 오류가 발생했습니다!', ephemeral: true });
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


async function handleButtonInteraction(interaction, customId, values) {
    switch (customId) {

        case 'upDate':
        case 'upDateButton':
            await updateChannels(interaction);
            break;

        case 'removeButton':
            const command = await interaction.client.commands.get('닉네임삭제')
            await command.execute(interaction);
            break;

        case 'multitoolsButton':
            multitools(interaction);
            break;

        case 'teamEmbedDeleteButton':
            teamEmbedDelete(interaction);
            break;

        // 다시 섞기
        case 'teamReshuffleButton':
            const teamShufflerData = teamShufflerMap.get('teamShufflerData');
            teamReshuffle(interaction, teamShufflerData);
            teamShufflerMap.delete();
            break;

        default:
            console.log('isButton 에서 알 수 없는 customId : ' + customId);
    };
};

async function handleSubmitModal(interaction, customId, values) {
    const customIdParts = customId.split('_')[0];

    switch (customIdParts) {
        case 'submitNickname':
            saveUserNickname(interaction);
            break;

        case 'teamNumberModal':
            excludeMembers(interaction, values);
            break;
    };
};


async function handleStringSelectMenu(interaction, customId, values) {

    switch (customId) {
        case 'gameMenu': // 닉네임 등록 모달 메뉴 생성
            await createNicknameModal(interaction);
            break;

        case 'removeNickNames': // 닉네임 삭제 제출 -> DB 저장
            removeNickname(interaction);
            break;

        /* 서버 메뉴 보이기 or 숨기기 */
        case 'adminMenuId': // 관리자 게임 메뉴
            if (checkAdminRole(interaction)) {
                // gameMenuToggle(interaction, values[0]);

                // 현재 테스트중
                gameMenuToggle(interaction);

            } else { // 권한이 없을 경우 사용자에게 알림
                interaction.reply({ content: '관리자 메뉴에 접근할 권한이 없습니다.', ephemeral: true });
            };
            break;

        // case 'showMenuHandler': // 메뉴 숨기기 -> DB 저장
        // toggleMenuHandler(interaction, 'showMenu');
        // break;

        // case 'hideMenuHandler': // 메뉴 보이기 -> DB 저장
        // toggleMenuHandler(interaction, 'hideMenu');
        // break;

        case 'showMenu':
        case 'hideMenu':
            // 현재 테스트 중
            toggleMenuHandler(interaction);
            break;


        /* 멀티 툴 */
        case 'multitoolsMenu': // 몇팀으로 나눌까요?
            if (values[0] === 'teamShuffler') {
                return teamShuffler(interaction);
            }
            break;

        /* 팀 섞기 */
        case 'teamShufflerMenu':
            if (values[0] === '0_') { // 몇 팀으로 나누나요?
                showTeamNumberModal(interaction);
            } else {
                excludeMembers(interaction, values); // 두 개의 팀, 세 개의 팀 으로 나눈다.
            }
            break;

        case 'excludeMembers': // 몇 팀인지 + 제외 인원 받고 최종적으로 처리하기
            teamShufflerHandler(interaction, values);

            teamShufflerMap.set('teamShufflerData', values);

            break;

        default:
            console.log('isMessageComponent 에서 알 수 없는 customId : ' + customId);
    };
};


module.exports = { handleinteraction };