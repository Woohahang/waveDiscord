// getMemberVoiceChannel.js

async function getMemberVoiceChannel(interaction) {
    try {
        // 입장 음성 채널 객체
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            const message = await interaction.reply({
                content: '음성 채널 입장 후 사용할 수 있습니다.',
                ephemeral: true
            });

            // 메세지 10초 뒤 삭제
            setTimeout(() => {
                message.delete();
            }, 10_000);

            return null;
        };
        return voiceChannel;

    } catch (error) {
        console.error('getMemberVoiceChannel 함수 에러 : ', error);
    };
};

module.exports = { getMemberVoiceChannel };