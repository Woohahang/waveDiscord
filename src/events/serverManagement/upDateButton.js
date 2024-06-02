// upDateButton.js

const updateChannels = require('../guildCreate/update/updateChannels');

const updateCompleted =
    '\n' + '## 업데이트 완료' +
    '\n' + '> * 현재 **Wave** 는 보완과 개발 단계에 있습니다. ' +
    '\n' + '> * 개발은 지금도 진행 중이며 가끔 업데이트 버튼을 눌러주세요.';

module.exports = async (interaction) => {
    try {
        // 인터랙션 지연 처리
        await interaction.deferUpdate();

        // 서버의 모든 메뉴 업데이트
        const create = await updateChannels(interaction);

        if (create) {
            // 지연 된 처리를 받기 위한 followUp
            await interaction.followUp({ content: '> 닉네임 등록 채널을 찾지 못해 하나 만들었어요 !\n> 혹시 옛날 닉네임 등록 채널이 남아있다면 삭제 부탁해요 !', ephemeral: true });
        } else {
            await interaction.followUp({ content: updateCompleted, components: [], ephemeral: true });

        };

    } catch (error) {
        console.error('upDateButton.js 에러', error);
    };
};