// userStatusEmbed.js

const { EmbedBuilder } = require('discord.js');
const createFields = require('./embedModules/createFields');
const emojiLoad = require('./embedModules/emojiLoad');
const isValidEmojis = require('./embedModules/isValidEmojis');
const requiresUpdateField = require('./embedModules/requiresUpdateField');
const logUserInfo = require('../../../utils/log/logUserInfo');


let emojiMaps = {};
let emojiTimestamps = {};
const SIX_HOURS_IN_MS = 6 * 60 * 60 * 1000; // 6시간

// 1시간(3600000밀리초) 후에 해당 guildId 데이터를 삭제하는 함수
const scheduleEmojiCleanup = (guildId) => {
    // 6시간 후에 이모지 데이터를 삭제하는 타이머 설정
    setTimeout(() => {
        try {
            // 현재 시간과 이모지 타임스탬프를 비교하여 6시간이 지난 경우 이모지 데이터 삭제
            if (Date.now() - emojiTimestamps[guildId] >= SIX_HOURS_IN_MS) {
                delete emojiMaps[guildId];
                delete emojiTimestamps[guildId];
                console.log(`삭제된 이모지 맵 : ${guildId}`);
            };
        } catch (error) {
            console.error('scheduleEmojiCleanup.js 이모지 맵 청소 도중 예외 발생 : ', error);
        };
    }, SIX_HOURS_IN_MS);
};



module.exports = async (newState, userData, guildData) => {
    try {
        const member = newState.member;
        const guildId = newState.guild.id;
        const displayName = member.nickname ? member.nickname : member.user.globalName;
        const waveEmojis = emojiMaps[guildId] || await emojiLoad(newState, emojiMaps);

        // 이모지 타임스탬프 갱신 및 클린업 스케줄링
        emojiTimestamps[guildId] = Date.now();
        scheduleEmojiCleanup(guildId);

        // 기본 필드를 requiresUpdateField로 설정
        let fields = requiresUpdateField();

        // 이모지가 유효하면 유저 정보 생성
        if (isValidEmojis(guildData, newState.guild)) {
            fields = createFields(userData, guildData, waveEmojis);
        };

        // 필드가 비어 있는 경우 리턴
        if (!fields || fields.length === 0) {
            return null;
        };

        // 임베드 정의
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setColor(0x0099FF)
            .setAuthor({ name: displayName, iconURL: member.user.displayAvatarURL(), url: member.user.avatarURL() })
            .addFields(fields)
            .setTimestamp(new Date(userData.updatedAt))
            .setFooter({ text: '―――――――― update', iconURL: 'https://drive.google.com/uc?export=view&id=19W-rsIvrkFJSJcZ7-PHXOfZcPRO1HYTi' });

        return embed;

    } catch (error) {
        logUserInfo(newState);
        console.error('userStatusEmbed.js 예외 : ', error);
    };
};