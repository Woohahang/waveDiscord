// adminMessage.js

const { adminMenuLoader } = require('./adminMenuLoader');
const { adminButton } = require('./adminButton');

const serverStatusMessage =
    '## :gear: Wave 서버 상태\n' +
    '> * :label: 서버 별명 양식 : 미등록';

async function adminMessage(channel) {
    try {
        const message1 = await channel.send({
            content: "## ⭐ Wave 관리자 채널",
            components: [adminMenuLoader(), adminButton()]
        });

        const message2 = await channel.send({ content: serverStatusMessage });

        return [message1.id, message2.id];

    } catch (error) {
        console.error('adminMessage 에러 : ', error);
    };
};

module.exports = { adminMessage };