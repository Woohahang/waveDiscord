// guildCreate.js

const resetGuildDatabase = require('../mongoDB/resetGuildDatabase');

const { mainChannelCreate } = require('../events/guildCreate/mainChannel/mainChannelCreate');
const { mainChannelMessage } = require('../events/guildCreate/mainChannel/mainChannelMessage');
const { checkAdminPermissionOnGuild } = require('../module/checkAdminPermissionOnGuild');


async function handleGuildCreate(guild) {
    try {

        if (await checkAdminPermissionOnGuild(guild)) { // 봇이 관리자 권한을 받았는지 체크

            await resetGuildDatabase(guild); // 길드 DB 초기화

            await mainChannelCreate(guild); // 길드 main 채널 생성
            await mainChannelMessage(guild); // main 채널 Message 전송



        } else {
            guildInviteMessage(guild); // 관리자 권한을 못 받았다면 1:1 DM 전송
        }

    } catch (error) {
        console.error(error);
    }
}

module.exports = { handleGuildCreate };