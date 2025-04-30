const { checkGuildAdmin } = require('../module/checkAdminPermissionOn');

const saveGuildOwnerData = require('../events/guildCreate/setupChannel/guildOwnerData/handler/saveGuildOwnerData');

/* 관리자 채널 메시지*/
const setupAdminChannel = require('../events/guildCreate/setupChannel/adminChannel/handler/setupAdminChannel');
const setupMainChannel = require('../events/guildCreate/setupChannel/mainChannel/handler/setupMainChannel');

/* 개인 DM */
const adminPermissionRequest = require('../events/userChannel/ownerMessage/handler/adminPermissionRequest');

/**
 * 길드에 초대되었을 때 실행되는 함수입니다.
 * 
 * @param {Object} guild - 초대된 길드의 정보
*/
module.exports = async (guild) => {
    try {
        // Wave 가 관리자 권한을 받았는지 체크합니다.
        if (checkGuildAdmin(guild)) {

            await saveGuildOwnerData(guild); // 길드 이름 및 오너 ID를 저장합니다.
            await setupAdminChannel(guild); // Wave 관리자 채널을 생성합니다.
            await setupMainChannel(guild); // Wave 메인 채널을 생성합니다.

        } else {
            // 관리자 권한을 받지 못 했다면 1:1 알림 DM을 전송합니다.
            await adminPermissionRequest(guild);
        };
    } catch (error) {
        console.error('guildCreate.js 예외 : ', error);
    };
};