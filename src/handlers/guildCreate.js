const { checkGuildAdmin } = require('../module/checkAdminPermissionOn');

/* 관리자 채널 메시지*/
const setupAdminChannel = require('../events/guildCreate/setupChannel/adminChannel/handler/setupAdminChannel');
const setupMainChannel = require('../events/guildCreate/setupChannel/mainChannel/handler/setupMainChannel');

/* 개인 DM */
const adminPermissionRequest = require('../events/guildCreate/userChannel/sendOwnerMessage/handler/adminPermissionRequest');

/* 이모지 등록 */
const emojiUpdate = require('../events/guildCreate/guildEmoji/emojiHandler/emojiUpdate');


module.exports = async (guild) => {
    try {
        // Wave 가 관리자 권한을 받았는지 체크합니다.
        if (checkGuildAdmin(guild)) {

            await Promise.all([
                setupAdminChannel(guild), // Wave 관리자 채널을 생성합니다.
                setupMainChannel(guild), // Wave 메인 채널을 생성합니다.
                emojiUpdate(guild), // Wave 이모지를 등록합니다.
            ]);

        } else {
            // 관리자 권한을 받지 못 했다면 1:1 알림 DM을 전송합니다.
            await adminPermissionRequest(guild);
        };
    } catch (error) {
        console.error('guildCreate.js 예외 : ', error);
    };
};