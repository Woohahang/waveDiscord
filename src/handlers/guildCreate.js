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
const emojiUpdate = require('../events/guildCreate/guildEmoji/emojiHandler/emojiUpdate');


module.exports = async (guild) => {
    try {
        // Wave 가 관리자 권한을 받았는지 체크합니다.
        if (checkGuildAdmin(guild)) {

            // 채널 생성 및 이모지를 등록합니다.
            await Promise.all([
                mainChannelCreate(guild),
                adminChannelCreate(guild),
                emojiUpdate(guild),
            ]);

            // 생성 된 채널에 메세지를 전송합니다.
            await Promise.all([
                mainChannelMessage(guild),
                adminChannelMessage(guild),
            ]);

        } else {
            // 관리자 권한을 받지 못 했다면 1:1 알림 DM을 전송합니다.
            await guildInviteMessage(guild);
        };
    } catch (error) {
        console.error('guildCreate.js 예외 : ', error);
    };
};