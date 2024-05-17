// teamShufflerHandler.js

const { teamEmbedDeleteButton } = require('./teamEmbedDeleteButton');
const { generateTeamEmbed } = require('./module/createTeamEmbed');
const { checkVoiceChannel } = require('./module/checkVoiceChannel');

// 팀 섞기 임베드 전송
async function teamShufflerHandler(interaction, values) {
    try {

        // 음성 채널 체크, 음성 채널 입장 객체
        const voiceChannel = await checkVoiceChannel(interaction);
        if (!voiceChannel) return;

        // 팀 섞기 임베드 생성
        const embed = await generateTeamEmbed(interaction, voiceChannel, values);
        if (!embed) return;

        const sentMessage = await voiceChannel.send({
            embeds: [embed],
            components: [teamEmbedDeleteButton()]
        });

        // 5초 뒤 삭제 버튼 활성화
        setTimeout(async () => {
            // 버튼을 활성화 상태로 업데이트
            const updatedRow = teamEmbedDeleteButton(false); // false를 전달하여 버튼을 활성화

            await sentMessage.edit({
                embeds: [embed], // embed 변수는 여전히 유효한 범위 내에 있어야 합니다.
                components: [updatedRow]
            });
        }, 5000);

        await interaction.update({
            content: '## :star: 팀 구성 완료 ! ' + `\n > <#${voiceChannel.id}> 의 채팅을 확인해주세요 !`,
            components: [],
            ephemeral: true
        });

    } catch (error) {
        console.error('teamShufflerHandler.js' + error);
    };

};

module.exports = { teamShufflerHandler };