// interaction.js

/* 관리자 권한 체크 */
const { checkInteractionAdmin } = require('../module/checkAdminPermissionOn');

/* 닉네임 저장 */
const nickNameModal = require('../events/userNickName/nickNameHandlers/nickNameModal');
const removeNickName = require('../events/userNickName/nickNameHandlers/removeNickName');
const saveNickName = require('../events/userNickName/nickNameHandlers/saveNickName');

/* 길드 메뉴 컨트롤 */
const gameMenuToggle = require('../events/guildCreate/guildMenuControls/gameMenuToggle');
const toggleMenuHandler = require('../events/guildCreate/guildMenuControls/toggleMenuHandler');

/* 채널 업데이트 */
const updateChannels = require('../events/guildCreate/update/updateHandler/updateChannels');

/* 멀티 툴 */
const multitools = require('../events/multitools/multitools');

/* 팀 섞기 */
const teamShuffler = require('../events/multitools/teamShuffler/teamShuffler');
const { excludeMembers } = require('../events/multitools/teamShuffler/excludeMembers');
const { teamEmbedDelete } = require('../events/multitools/teamShuffler/teamEmbedDeleteHandler');
const teamShufflerHandler = require('../events/multitools/teamShuffler/teamShufflerHandler');
const showTeamNumberModal = require('../events/multitools/teamShuffler/showTeamNumberModal');
const teamReshuffle = require('../events/multitools/teamShuffler/teamReshuffle');


const assignRoleByNick = require('../events/guildAliasTemplates/aliasHandlers/assignRoleByNick');
const setAliasSeparator = require('../events/guildAliasTemplates/aliasHandlers/setAliasSeparator');
const nicknameRoleAssigner = require('../events/guildAliasTemplates/aliasHandlers/nicknameRoleAssigner');
const nicknameTemplateSaver = require('../events/guildAliasTemplates/aliasHandlers/nicknameTemplateSaver');


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
            handleButtonInteraction(interaction, customId);

        } else if (interaction.isModalSubmit()) {
            handleSubmitModal(interaction, customId, values);

        } else if (interaction.isStringSelectMenu()) {
            await handleStringSelectMenu(interaction);

        } else if (interaction.isChatInputCommand()) {
            await handleChatInputCommand(interaction);
        };

    } catch (error) {
        console.error('interaction.js 에서 handleinteraction 에러 :', error);
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


async function handleButtonInteraction(interaction, customId) {
    try {
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
    } catch (error) {
        console.error('interaction.js 의 handleButtonInteraction 에러 : ', error);
    };
};


async function handleSubmitModal(interaction, customId, values) {
    try {
        const customIdParts = customId.split('_')[0];

        switch (customIdParts) {
            case 'submitNickname':
                saveNickName(interaction);
                break;

            case 'teamNumberModal':
                excludeMembers(interaction, values);
                break;
        };
    } catch (error) {
        console.error('interaction.js 의 handleSubmitModal 에러 : ', error);
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
                removeNickName(interaction);
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




    } catch (error) {
        console.error('interaction.js 의 handleStringSelectMenu 에러 : ', error);
    };
};



module.exports = { handleinteraction };