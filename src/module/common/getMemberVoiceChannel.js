// getMemberVoiceChannel.js

async function getMemberVoiceChannel(interaction) {
    try {
        // 입장 음성 채널 객체
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            await interaction.reply({
                content: '음성 채널 입장 후 사용할 수 있습니다.',
                ephemeral: true
            });
            return null;
        };
        return voiceChannel;

    } catch (error) {
        console.error('getMemberVoiceChannel 함수 에러 : ', error);
    };
};

module.exports = { getMemberVoiceChannel };