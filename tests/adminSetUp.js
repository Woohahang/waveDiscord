// // adminSetUp.js

// const { SlashCommandBuilder } = require('discord.js');
// const { checkAdminRole } = require('../../module/checkAdminRole');
// const GuildSettings = require('../../services/GuildSettings');
// const adminChannelCreate = require('../../events/guildCreate/adminChannel/adminChannelCreate');
// const adminChannelMessage = require('../../events/guildCreate/adminChannel/adminChannelMessage');

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName("관리자채널")
//         .setDescription("Wave 관리자 채널을 생성합니다 !"),

//     async execute(interaction) {
//         try {
//             // 관리자만 사용할 수 있도록 역할 체크
//             if (!checkAdminRole(interaction)) {
//                 await interaction.reply({ content: '해당 기능은 관리자만 사용할 수 있습니다.', ephemeral: true })
//                 return;
//             };

//             // 길드 인스턴스 생성
//             const guildSettings = new GuildSettings(interaction.guild.id);

//             // 길드 관리자 채널 id 가지고 오기
//             const adminChannelId = await guildSettings.loadAdminChannelId();

//             // 관리자 채널 객체
//             const adminChannel = interaction.guild.channels.cache.get(adminChannelId);

//             // 없다면 관리자 채널 생성
//             if (!adminChannel) {
//                 await adminChannelCreate(interaction.guild);
//                 await adminChannelMessage(interaction.guild);
//                 await interaction.reply({
//                     content: 'Wave 관리자 채널이 없네요 ! 새로 만들었어요 !',
//                     ephemeral: true
//                 });

//             } else {
//                 await adminChannel.delete();
//                 await adminChannelCreate(interaction.guild);
//                 await adminChannelMessage(interaction.guild);
//                 await interaction.reply({
//                     content: '기존에 있던 Wave 관리자 채널을 삭제 하고 다시 만들었어요 !',
//                     ephemeral: true
//                 });

//             };
//         } catch (error) {
//             console.error('adminSetUp.js 에러 : ', error);
//             await interaction.reply({ content: '알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해주세요.' });
//         };
//     }
// };