// verifyVoiceChannel.js

async function verifyVoiceChannel(interaction) {
    try {

        // 멤버가 있는 위치
        let voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            await interaction.reply({ content: '음성 채널에 있어야 이 기능을 사용할 수 있습니다.', ephemeral: true });
            return null;
        };



        return voiceChannel;

    } catch (error) {
        console.error('verifyVoiceChannel 에러 : ' + error);
    };

};

module.exports = { verifyVoiceChannel };