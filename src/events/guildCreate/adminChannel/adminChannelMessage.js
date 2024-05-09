// adminChannelMessage.js

const guildSettingsSchema = require('../../../mongoDB/guildSettingsSchema');
const { adminMenuLoader } = require('../../../module/adminModules/adminMenuLoader');
const { adminButton } = require('../../../module/adminModules/adminButton');


async function adminMessage(channel) {
    try {
        await channel.send({
            content: "## ⭐ Wave 관리자 채널",
            components: [adminMenuLoader(), adminButton()]
        });

        await channel.send({ content: '> * **채널 보기 권한 OFF 적용 상태 **\n> * **채널 보기 OFF** 를 유지해 주세요.' });
    } catch (error) {
        console.error('메시지 전송 중 오류가 발생했습니다:', error);
    };
};

// 길드 채널이 만들어 지면 Collection 객체에 채널 객체를 그대로 저장 이후 여기에 채널 인자를 받고 거기에 메시지 전송하면 될듯
async function adminChannelMessage(guild) {

    // 길드 id 를 조회하여 관리자 채널 id 얻기
    const guildSettings = await guildSettingsSchema.findOne({ guildId: guild.id });
    const adminChannelId = guildSettings.adminChannelId;

    if (!adminChannelId) {
        return console.log('관리자 채널 id를 찾을 수 없습니다.');
    };

    // 관리자 채널 객체 선언
    const channel = guild.channels.cache.get(adminChannelId);

    // 메시지 전송
    adminMessage(channel);
};

module.exports = { adminChannelMessage, adminMessage };