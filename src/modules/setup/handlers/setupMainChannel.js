const createMainChannel = require("../createMainChannel");
const GuildSettings = require("@services/GuildSettings");
const createMainSetupButtons = require("../createMainSetupButtons");
const botInfo = require('@utils/botInfo');
const logger = require('@utils/logger');
const buildNicknameSelectMenu = require("../buildNicknameSelectMenu");
const safeFetchChannel = require("@utils/discord/safeFetchChannel");
const fetchBotMessages = require("@utils/discord/fetchBotMessages");

const contentMessage =
    '## :star: Wave 메인 명령어' + '\n' +
    '## /닉네임등록  /닉네임삭제';

/**
 * 주어진 길드에 대해 Wave의 메인 채널을 설정합니다.
 * 
 * - 기존 메인 채널을 불러오거나 새로 생성합니다.
 * @param {import('discord.js').Guild} guild - 메인 채널을 설정할 디스코드 길드 객체
 * @returns {Promise<void>}
 */
module.exports = async (guild) => {
    try {
        // 길드 설정을 불러오거나 새로 생성
        const guildSettings = new GuildSettings(guild.id);
        const guildData = await guildSettings.loadOrCreate();

        // 저장된 메인 채널이 존재하면 가져오고, 없거나 삭제된 경우 새로 생성
        let channel = await safeFetchChannel(guild, guildData.mainChannelId);
        if (!channel) {
            channel = await createMainChannel(guild);
            await guildSettings.saveChannelId('mainChannel', channel.id);
        }

        // 최근 메시지 중 Wave 봇이 보낸 메시지 필터링
        const botMessages = await fetchBotMessages(channel);

        // 새 메시지를 전송
        await channel.send({
            content: contentMessage,
            components: [
                buildNicknameSelectMenu(guildData),
                createMainSetupButtons()
            ]
        });

        // 이전 Wave 봇 메시지 삭제
        await Promise.all(botMessages.map(msg => msg.delete()).filter(Boolean));

    } catch (error) {
        logger.error('[setupMainChannel] 메인 채널 셋업 중 오류', {
            errorMessage: error.message,
            guildId: guild.id,
            channelType: 'mainChannel',
        })

        throw error;
    }
};