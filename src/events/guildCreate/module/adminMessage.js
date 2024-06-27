const { adminMenuLoader } = require('./adminMenuLoader');
const { adminButton } = require('./adminButton');

const serverSettingsMessage =
    '## :gear: 서버 설정\n' +
    '> ### :label: 닉네임/나이/티어\n';

async function adminMessage(channel) {
    // try {
    //     const message1 = await channel.send({
    //         content: '# ⭐ Wave 관리자 채널',
    //         components: [adminMenuLoader(), adminButton()]
    //     });

    //     const message2 = await channel.send({ content: serverSettingsMessage });

    //     return [message1.id, message2.id];

    // } catch (error) {
    //     console.error('adminMessage 에러 : ', error);
    // };
};

module.exports = { adminMessage };