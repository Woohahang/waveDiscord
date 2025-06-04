const { SlashCommandBuilder } = require('discord.js');
const logger = require('@utils/logger');
const createGameRankSelectMenu = require('@modules/rank/createGameRankSelectMenu');
const getMessageByKey = require('@shared/utils/getMessageByKey');
const MESSAGE_KEYS = require('@constants/messageKey');

/**
 * /랭킹 명령어 핸들러
 * 
 * 사용자가 /랭킹 명령어를 실행하면, 선택할 수 있는 게임 랭킹 메뉴를 표시합니다.
 * 해당 메뉴에서 게임을 선택하면, 서버 유저들의 해당 게임 랭킹 정보를 확인할 수 있습니다.
 * 
 * - 메뉴 구성: createGameRankSelectMenu 함수로 생성
 * - 메시지 출력: getMessageByKey 함수로 키 기반 메시지 출력
 * - 메시지는 ephemeral로 전송되며, 사용자 본인만 확인할 수 있습니다.
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('랭킹')
        .setDescription('서버 친구들의 게임 티어 및 랭킹을 확인합니다.'),

    async execute(interaction) {
        try {
            const rankSelectMenuRow = createGameRankSelectMenu();

            await interaction.reply({
                content: getMessageByKey(MESSAGE_KEYS.RANK_GAME_SELECT),
                components: [rankSelectMenuRow],
                ephemeral: true
            });

        } catch (error) {
            logger.error('[rank] 랭킹 명령어 실행 중 오류 발생', {
                stack: error.stack
            });
        };
    }
};