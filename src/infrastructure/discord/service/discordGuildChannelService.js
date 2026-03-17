const { PermissionsBitField, ChannelType } = require('discord.js');
const fetchBotMessages = require('@utils/discord/fetchBotMessages');
const createMainSetupButtons = require('@modules/guildSetup/createMainSetupButtons');
const createAdminMenuSelect = require('@modules/guildSetup/createAdminMenuSelect');
const createAdminActionButtons = require('@modules/guildSetup/createAdminActionButtons');
const buildGuildNicknameSelectMenu = require('../components/buildGuildNicknameSelectMenu');

const UNKNOWN_CHANNEL_ERROR = 10003;

const MAIN_CHANNEL_MESSAGE =
    '## :star: Wave 메인 명령어\n' +
    '## /닉네임등록  /닉네임삭제';

const ADMIN_CHANNEL_MESSAGE =
    '# ⭐ Wave 관리자 채널';

class DiscordGuildChannelService {
    /**
     * 저장된 채널 ID로 길드 채널을 안전하게 조회합니다.
     *
     * @param {import('discord.js').Guild} discordGuild
     * @param {string} channelId
     * @returns {Promise<import('discord.js').GuildBasedChannel|null>}
     */
    async safeFetchChannel(discordGuild, channelId) {
        try {
            if (!channelId) return null;

            return await discordGuild.channels.fetch(channelId);
        } catch (error) {
            if (error.code === UNKNOWN_CHANNEL_ERROR)
                return null;

            throw new Error(`[DiscordGuildChannelService.safeFetchChannel] ${error.message}`);
        }
    }

    /**
     * Wave 메인 채널을 생성합니다.
     *
     * @param {import('discord.js').Guild} discordGuild
     * @returns {Promise<import('discord.js').GuildBasedChannel>}
     */
    async createMainChannel(discordGuild) {
        try {
            return await discordGuild.channels.create({
                name: '📘ㆍwave',
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: discordGuild.roles.everyone.id,
                        deny: [PermissionsBitField.Flags.SendMessages],
                    },
                ],
            });
        } catch (error) {
            throw new Error(`[DiscordGuildChannelService.createMainChannel] ${error.message}`);
        }
    }

    /**
     * Wave 관리자 채널을 생성합니다.
     *
     * @param {import('discord.js').Guild} discordGuild
     * @returns {Promise<import('discord.js').GuildBasedChannel>}
     */
    async createAdminChannel(discordGuild) {
        try {
            return await discordGuild.channels.create({
                name: '📘ㆍwave 관리자',
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: discordGuild.roles.everyone.id,
                        deny: [PermissionsBitField.Flags.ViewChannel],
                    },
                ],
            });
        } catch (error) {
            throw new Error(`[DiscordGuildChannelService.createAdminChannel] ${error.message}`);
        }
    }

    /**
     * 메인 채널의 기존 Wave 메시지를 조회합니다.
     *
     * @param {import('discord.js').GuildBasedChannel} channel
     * @returns {Promise<import('discord.js').Message[]>}
     */
    async fetchMainChannelBotMessages(channel) {
        return fetchBotMessages(channel);
    }

    /**
     * 관리자 채널의 기존 Wave 메시지를 조회합니다.
     *
     * @param {import('discord.js').GuildBasedChannel} channel
     * @returns {Promise<import('discord.js').Message[]>}
     */
    async fetchAdminChannelBotMessages(channel) {
        return fetchBotMessages(channel);
    }

    /**
     * 메인 채널에 Wave UI 메시지를 전송합니다.
     *
     * @param {Object} params
     * @param {import('discord.js').GuildBasedChannel} params.channel
     * @param {Object} params.guildConfig
     * @returns {Promise<import('discord.js').Message>}
    */
    async publishMainChannelUI({ channel, guildConfig }) {
        try {
            return await channel.send({
                content: MAIN_CHANNEL_MESSAGE,
                components: [
                    buildGuildNicknameSelectMenu(guildConfig),
                    createMainSetupButtons(),
                ],
            });
        } catch (error) {
            throw new Error(`[DiscordGuildChannelService.publishMainChannelUI] ${error.message}`);
        }
    }

    /**
     * 관리자 채널에 Wave UI 메시지를 전송합니다.
     *
     * @param {Object} params
     * @param {import('discord.js').GuildBasedChannel} params.channel
     * @returns {Promise<import('discord.js').Message>}
     */
    async publishAdminChannelUI({ channel }) {
        try {
            return await channel.send({
                content: ADMIN_CHANNEL_MESSAGE,
                components: [
                    createAdminMenuSelect(),
                    createAdminActionButtons(),
                ],
            });
        } catch (error) {
            throw new Error(`[DiscordGuildChannelService.publishAdminChannelUI] ${error.message}`);
        }
    }

    /**
     * 메시지 목록을 삭제합니다.
     *
     * @param {import('discord.js').Message[]} messages
     * @returns {Promise<void>}
     */
    async deleteMessages(messages) {
        await Promise.all(
            messages.map(message => message?.delete()).filter(Boolean)
        );
    }
}

module.exports = DiscordGuildChannelService;