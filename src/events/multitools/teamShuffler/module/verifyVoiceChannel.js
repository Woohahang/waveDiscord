// verifyVoiceChannel.js

async function verifyVoiceChannel(interaction) {
    let voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
        await interaction.update({ content: '음성 채널에 있어야 이 기능을 사용할 수 있습니다.', components: [], ephemeral: true });
        return;
    };

    return voiceChannel;
};

module.exports = { verifyVoiceChannel };