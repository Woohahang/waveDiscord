const { clientId } = require('../../../config.json');

const { adminMenuLoader } = require('../module/adminModules/adminMenuLoader.js');
const { adminButton } = require('../module/adminModules/adminButton.js');

module.exports = async (interaction) => {
    try {

        const channel = interaction.channel;
        const messages = await channel.messages.fetch({ limit: 10 });
        const waveMessages = messages.filter(message => message.author.id === clientId);

        // 이전 메시지 삭제
        waveMessages.forEach(message => {
            message?.delete(); // 메시지가 없더라도 작업을 중단하지 않고 undefined 반환
        });

        // 메시지 전송
        await channel.send({
            content: '## ⭐ Wave 관리자 채널',
            components: [adminMenuLoader(), adminButton()],
        })

        await channel.send({ content: '> * **채널 보기 권한 OFF 적용 상태 **\n> * **채널을 옮기는 과정** 중에 권한이 풀릴 수도 있습니다.' });

        // 업데이트 내용 알림
        await interaction.reply({
            content: upDateMessage(),
            ephemeral: true
        })

    } catch (error) {
        console.error(error);
    }
};

function upDateMessage() {
    let message;

    message = '## 업데이트 완료' + '\n';
    message += '> * 현재 **Wave** 는 보완과 개발 단계에 있습니다. ' + '\n';
    message += '> * 개발은 지금도 진행 중이며 가끔 업데이트 버튼을 눌러주세요.' + '\n';
    message += '## 기획 중인 기능' + '\n';
    message += '> * 관리자 채널에 있는 선택 메뉴 기능' + '\n';
    message += '> * 유저 검색' + '\n';
    message += '> * [ ON/OFF ] 닉네임 정보 옆 티어 자동 표기' + '\n';

    return message;
}


/*
    업데이트 기능 구현하기
    상호작용 받은 채널에서
    
    메시지 10개를 들고 와서
    wave가 보낸 메시지를 다 삭제하고
    
    객체를 하나 들고와서
    채팅 보내기!
    완벽한데?

    계획을 안 보이게 띄우면 좋을듯?

*/



/*

    채팅은 파일 내에서 가지고 올 수 있으나 채널이 또 생성되는걸 막지 못 한다.
    따라서, 채팅을 함수화 시켜 다른 모듈로 분리한다.
    유지 보수가 더 쉬워질듯?
    그러나 폴더 분류를 어떻게 해야될지 고민해야 될듯

*/