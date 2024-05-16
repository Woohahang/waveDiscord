// teamReshuffle.js

const { generateTeamEmbed } = require('./module/createTeamEmbed');
const { teamEmbedDeleteButton } = require('./teamEmbedDeleteButton');
const { verifyVoiceChannel } = require('./module/verifyVoiceChannel');


const verifyButtonVoiceChannelMatch = (interaction) => {

};



// 팀 섞기 : 다시 섞기
async function teamReshuffle(interaction, values) {
    try {

        // 멤버가 음성 채널에 있는지
        // const voiceChannel = await verifyVoiceChannel(interaction);

        // 멤버가 있는 음성 채널과 버튼을 누른 음성 채널이 다르다면
        if (interaction.member.voice && interaction.member.voice.channel.id !== interaction.channel.id) {
            return await interaction.reply({ content: `<#${interaction.channel.id}> 와 사용자의 채널이 다릅니다 !\n이동해주세요 !`, ephemeral: true })
        };

        const voiceChannel = interaction.member.voice.channel;


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
        console.error('' + error);
    };
};

module.exports = { teamReshuffle };