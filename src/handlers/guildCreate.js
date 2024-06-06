// guildCreate.js

const { checkGuildAdmin } = require('../module/checkAdminPermissionOn');

/* 메인 채널 메시지 */
const mainChannelCreate = require('../events/guildCreate/mainChannel/mainChannelCreate');
const mainChannelMessage = require('../events/guildCreate/mainChannel/mainChannelMessage');

/* 관리자 채널 메시지*/
const adminChannelCreate = require('../events/guildCreate/adminChannel/adminChannelCreate');
const adminChannelMessage = require('../events/guildCreate/adminChannel/adminChannelMessage');

/* 개인 DM */
const guildInviteMessage = require('../events/guildCreate/userChannel/guildInviteMessage');

/* 이모지 등록 */
const emojiRegistrar = require('../events/guildCreate/guildEmoji/emojiRegistrar');

async function handleGuildCreate(guild) {
    try {
        // Wave 가 관리자 권한 받았는지 체크
        if (checkGuildAdmin(guild)) {

            // 메인 채널 생성 and 메세지 전송
            await mainChannelCreate(guild);
            mainChannelMessage(guild);

            // 관리자 채널 생성 and 메세지 전송
            await adminChannelCreate(guild);
            adminChannelMessage(guild);

            // Wave 이모지 서버에 등록
            emojiRegistrar(guild);

        } else {
            guildInviteMessage(guild); // 관리자 권한을 못 받았다면 1:1 DM 전송
        };
    } catch (error) {
        console.error(error);
    };
};

module.exports = { handleGuildCreate };