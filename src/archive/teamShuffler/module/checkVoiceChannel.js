// // checkVoiceChannel.js

// // 음성 채널 체크
// async function checkVoiceChannel(interaction) {
//     try {
//         const voiceChannel = interaction.member.voice.channel;

//         if (!voiceChannel) {
//             await interaction.update({
//                 content: '음성 채널 입장 후 사용할 수 있습니다.',
//                 components: [],
//                 ephemeral: true
//             });
//             return false;
//         };

//         return voiceChannel;

//     } catch (error) {
//         console.error('checkVoiceChannel 에러 : ' + error);
//         return false;
//     };
// };


// // 음성 채널 위치와 상호 작용 위치가 일치하는지 체크
// async function checkVoiceChannelMatch(interaction) {
//     try {
//         const voiceChannel = interaction.member.voice.channel;

//         if (!voiceChannel || voiceChannel.id !== interaction.channel.id) {
//             await interaction.reply({ content: `<#${interaction.channel.id}> 와 사용자의 채널이 다릅니다 !\n이동해주세요 !`, ephemeral: true });
//             return false;
//         };

//         return voiceChannel;

//     } catch (error) {
//         throw console.error('verifyButtonVoiceChannelMatch 에러 : ' + error);
//     };

// };


// module.exports = { checkVoiceChannel, checkVoiceChannelMatch };