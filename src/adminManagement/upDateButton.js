const { clientId } = require('../../../config.json');

const { adminMenuLoader } = require('../module/adminModules/adminMenuLoader.js');
const { adminButton } = require('../module/adminModules/adminButton.js');

module.exports = async (interaction) => {
    try {

        const userId = interaction.member.id;
        const ownerId = interaction.guild.ownerId;

        if (userId !== ownerId) {
            return await interaction.reply({
                content: '서버 소유자만 동작이 가능합니다.',
                ephemeral: true
            });
        }

        const channel = interaction.channel;
        const messages = await channel.messages.fetch({ limit: 10 });
        const waveMessages = messages.filter(message => message.author.id === clientId);

        waveMessages.forEach(message => {
            message?.delete(); // 메시지가 없더라도 작업을 중단하지 않고 undefined 반환
        });

        // 채널 내용
        await channel.send({
            content: '## ⭐ Wave 관리자 채널',
            components: [adminMenuLoader(), adminButton()],
        })

        await interaction.reply({
            content: '업데이트 완료',
            ephemeral: true
        })

    } catch (error) {
        console.error(error);
    }
};



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