const { checkGuildAdmin } = require('../module/checkAdminPermissionOn');

const saveGuildOwnerData = require('../events/guildCreate/setupChannel/guildOwnerData/handler/saveGuildOwnerData');

/* 관리자 채널 메시지*/
const setupAdminChannel = require('../events/guildCreate/setupChannel/adminChannel/handler/setupAdminChannel');
const setupMainChannel = require('../events/guildCreate/setupChannel/mainChannel/handler/setupMainChannel');

/* 개인 DM */
const adminPermissionRequest = require('../events/userChannel/ownerMessage/handler/adminPermissionRequest');

const logger = require('@utils/logger');

/**
 * 길드에 초대되었을 때 실행되는 함수입니다.
 * 
 * ⚠️ 주의: 절대 병렬 처리 (Promise.all 등) 하지 마세요!
 * 
 * - 아래 로직은 반드시 순차적으로 실행되어야 합니다.
 * - 병렬 처리 시, 같은 guildId로 DB에 중복 레코드가 생성되는 심각한 문제가 발생할 수 있습니다.
 * 
 * @param {Object} guild - 초대된 길드의 정보
*/
module.exports = async (guild) => {
    try {
        // Wave 가 관리자 권한을 받았는지 체크합니다.
        if (checkGuildAdmin(guild)) {

            // ⚠️ 절대 병렬 처리 금지!
            await saveGuildOwnerData(guild); // 길드 이름 및 오너 ID를 저장합니다.
            await setupAdminChannel(guild); // Wave 관리자 채널을 생성합니다.
            await setupMainChannel(guild); // Wave 메인 채널을 생성합니다.

        } else {
            // 관리자 권한을 받지 못 했다면 1:1 알림 DM을 전송합니다.
            await adminPermissionRequest(guild);
        };
    } catch (error) {
        logger.error('[guildCreate] interaction handlers 오류', {
            stack: error.stack
        });
    };
};