// teamShufflerHandler.js

const { teamEmbedDeleteButton } = require('./teamEmbedDeleteButton');
const { generateTeamEmbed } = require('./module/createTeamEmbed');
const { checkVoiceChannel } = require('./module/checkVoiceChannel');
const { enableButtonsLater } = require('./module/enableButtonsLater');

// 팀 섞기 임베드 전송
module.exports = async (interaction, values) => {
    try {
        const voiceChannel = await checkVoiceChannel(interaction);
        if (!voiceChannel) return;

        const embed = await generateTeamEmbed(interaction, voiceChannel, values);
        if (!embed) return;

        const sentMessage = await voiceChannel.send({
            embeds: [embed],
            components: [teamEmbedDeleteButton()]
        });

        // 5초 후에 버튼 활성화
        enableButtonsLater(sentMessage, embed);

        await interaction.update({
            content: '## :star: 팀 구성 완료 ! ' + `\n > <#${voiceChannel.id}> 의 채팅을 확인해주세요 !`,
            components: [],
            ephemeral: true
        });

    } catch (error) {
        console.error('teamShufflerHandler.js', error);
    };
};
