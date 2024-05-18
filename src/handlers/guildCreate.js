// guildCreate.js

const resetGuildDatabase = require('../mongoDB/resetGuildDatabase');

const { checkGuildAdmin } = require('../module/checkAdminPermissionOn');
const mainChannelCreate = require('../events/guildCreate/mainChannel/mainChannelCreate');
const mainChannelMessage = require('../events/guildCreate/mainChannel/mainChannelMessage');
const adminChannelCreate = require('../events/guildCreate/adminChannel/adminChannelCreate');
const adminChannelMessage = require('../events/guildCreate/adminChannel/adminChannelMessage');
const guildInviteMessage = require('../events/guildCreate/userChannel/guildInviteMessage');

async function handleGuildCreate(guild) {
    try {
        if (checkGuildAdmin(guild)) { // 봇이 관리자 권한을 받았는지 체크

            await resetGuildDatabase(guild); // 길드 DB 초기화

            await mainChannelCreate(guild); // main 채널 생성
            await mainChannelMessage(guild); // main 채널 메시지 전송

            await adminChannelCreate(guild); // admin 채널 생성
            await adminChannelMessage(guild); // admin 채널 메시지 전송

        } else {
            await guildInviteMessage(guild); // 관리자 권한을 못 받았다면 1:1 DM 전송
        };
    } catch (error) {
        console.error(error);
    };
};

module.exports = { handleGuildCreate };