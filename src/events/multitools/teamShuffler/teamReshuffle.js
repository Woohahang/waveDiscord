// teamReshuffle.js

const { generateTeamEmbed } = require('./module/createTeamEmbed');
const { teamEmbedDeleteButton } = require('./teamEmbedDeleteButton');
const { checkVoiceChannelMatch } = require('./module/checkVoiceChannel');

// 팀 섞기 : 다시 섞기
async function teamReshuffle(interaction, values) {
    try {

        // 음성 채널 위치와 버튼 위치 일치하는지 체크
        const voiceChannel = await checkVoiceChannelMatch(interaction);
        if (!voiceChannel) return;

        // 팀 섞기 임베드 생성
        const embed = await generateTeamEmbed(interaction, voiceChannel, values);

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

        await interaction.reply({
            content: '같은 옵션으로 팀을 재구성 했습니다.',
            ephemeral: true
        });

    } catch (error) {
        console.error('teamReshuffle 에러 : ' + error);
    };
};

module.exports = { teamReshuffle };