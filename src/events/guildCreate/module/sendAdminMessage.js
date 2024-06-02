// sendAdminMessage.js

const { adminMenuLoader } = require('../adminChannel/adminMenuLoader');
const { adminButton } = require('../adminChannel/adminButton');

async function sendAdminMessage(channel) {
    try {

        const message1 = await channel.send({
            content: "## ⭐ Wave 관리자 채널",
            components: [adminMenuLoader(), adminButton()]
        });

        const message2 = await channel.send({ content: '> * **채널 보기 권한 OFF 적용 상태 **\n> * **채널 보기 OFF** 를 유지해 주세요.' });

        return [message1.id, message2.id];

    } catch (error) {
        console.error('adminMessage 에러 : ', error);
    };
};

module.exports = { sendAdminMessage };