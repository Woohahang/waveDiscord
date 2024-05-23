// teamReshuffle.js

const { generateTeamEmbed } = require('./module/createTeamEmbed');
const { teamEmbedDeleteButton } = require('./teamEmbedDeleteButton');
const { checkVoiceChannelMatch } = require('./module/checkVoiceChannel');
const { enableButtonsLater } = require('./module/enableButtonsLater');

module.exports = async (interaction, values) => {
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

        // 5초 후 버튼 활성화
        enableButtonsLater(sentMessage, embed);

        await interaction.reply({
            content: '같은 옵션으로 팀을 재구성 했습니다.',
            ephemeral: true
        });

    } catch (error) {
        console.error('teamReshuffle 에러 : ' + error);
    };
};