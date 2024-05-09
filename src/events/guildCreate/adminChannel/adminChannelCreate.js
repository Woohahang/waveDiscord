const { adminMenuLoader } = require('../../../module/adminModules/adminMenuLoader');
const { adminButton } = require('../../../module/adminModules/adminButton');

async function adminChannelCreate(guild) {

    try {
        // 채널 이름
        const channel = await guild.channels.create({ name: '📘ㆍwave 관리자', type: 0 });

        // 메시지 보내기 off
        channel.permissionOverwrites.create(channel.guild.roles.everyone, { ViewChannel: false, SendMessages: false });

        await channel.send({
            content: "## ⭐ Wave 관리자 채널",
            components: [adminMenuLoader(), adminButton()],
        })

        await channel.send({ content: '> * **채널 보기 권한 OFF 적용 상태 **\n> * **채널을 옮기는 과정** 중에 권한이 풀릴 수도 있습니다.' });

    } catch (error) {
        console.error(error);
    }

};

module.exports = { adminChannelCreate };