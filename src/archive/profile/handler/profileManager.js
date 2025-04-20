// const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
// const { EmbedBuilder } = require('discord.js');
// const UserSettings = require('../../../../services/UserSettings');
// const deleteWaveMessages = require('../../modules/deleteWaveMessages');
// const generatePlatformEmbedFields = require('../modules/generatePlatformEmbedFields');

// function createButton() {
//     const decorateProfileButton = new ButtonBuilder()
//         .setCustomId('decorateProfile')
//         .setLabel('프로필 꾸미기')
//         .setStyle(ButtonStyle.Primary);

//     const updateProfileButton = new ButtonBuilder()
//         .setCustomId('updateProfile')
//         .setLabel('업데이트')
//         .setStyle(ButtonStyle.Success);

//     return new ActionRowBuilder()
//         .addComponents(decorateProfileButton, updateProfileButton);
// };

// function createEmbed(user, fields, { updatedAt }) {
//     const displayName = user.nickname ? user.username : user.globalName;

//     return new EmbedBuilder()
//         .setColor(0x0099FF)
//         .setAuthor({ name: displayName, iconURL: user.displayAvatarURL(), url: user.avatarURL() })
//         .addFields(fields)
//         .setTimestamp(new Date(updatedAt))
//         .setFooter({ text: '―――――― update', iconURL: 'https://drive.google.com/uc?export=view&id=19W-rsIvrkFJSJcZ7-PHXOfZcPRO1HYTi' });
// };

// module.exports = async (interaction) => {
//     try {
//         const user = interaction.user;
//         const channel = await user.createDM();

//         // Wave 채널의 봇 메세지를 모두 제거합니다. 최신화
//         await deleteWaveMessages(channel);

//         // 유저 인스턴스 생성 및 유저 데이터를 불러옵니다.
//         const userSettings = new UserSettings(user.id);
//         const userData = await userSettings.loadUserData();

//         let fields = generatePlatformEmbedFields(userData);

//         // 임베드 및 버튼을 생성합니다.
//         const embed = createEmbed(user, fields, userData);
//         const buttons = createButton();

//         await channel.send({
//             content: '# 프로필',
//             embeds: [embed],
//             components: [buttons] // 임베드 아래에 버튼 추가
//         });

//     } catch (error) {
//         console.error('profileManager.js 예외 : ', error);
//     };
// };