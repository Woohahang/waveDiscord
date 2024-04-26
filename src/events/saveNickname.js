// events/saveNickname.js

const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');
const userSchema = require('../models/userSchema.js');

module.exports = async (interaction) => {
    if (interaction.isStringSelectMenu() && interaction.customId === "gameSelectMenu") {

        const selectedValue = interaction.values[0];

        switch (selectedValue) {
            case 'steam':
                const steamModal = new ModalBuilder();
                steamModal.setTitle("Steam 코드");
                steamModal.setCustomId("steamCode");

                const steamInput = new TextInputBuilder()
                    .setCustomId('steamContent')
                    .setLabel("Steam 친구 코드를 작성해주세요.")
                    .setStyle(TextInputStyle.Short)

                const steamBox = new ActionRowBuilder().addComponents(steamInput)

                steamModal.addComponents(steamBox);

                await interaction.showModal(steamModal); break;

            case 'kaKaoBG':
                const kakaoModal = new ModalBuilder();
                kakaoModal.setTitle("KaKao BG 닉네임");
                kakaoModal.setCustomId("kaKaoName");

                const kakaoInput = new TextInputBuilder()
                    .setCustomId('kaKaoContent')
                    .setLabel("KaKao Battle Grounds 닉네임을 작성해주세요.")
                    .setStyle(TextInputStyle.Short)

                const kakaoBox = new ActionRowBuilder().addComponents(kakaoInput)

                kakaoModal.addComponents(kakaoBox);

                await interaction.showModal(kakaoModal); break;

            case 'loL':
                const loLModal = new ModalBuilder();
                loLModal.setTitle("LoL 닉네임");
                loLModal.setCustomId("loLName");

                const loLInput = new TextInputBuilder()
                    .setCustomId('loLContent')
                    .setLabel("League of Legends 닉네임을 작성해주세요.")
                    .setStyle(TextInputStyle.Short)

                const loLBox = new ActionRowBuilder().addComponents(loLInput)

                loLModal.addComponents(loLBox);

                await interaction.showModal(loLModal); break;

            default:
                console.log('알 수 없는 선택 발생 : events/saveNickname.js ');
                break;
        }
    }

    // 전송 처리 상호작용
    if (interaction.isModalSubmit()) {
        switch (interaction.customId) {
            case 'steamCode':
                const steamContent = interaction.fields.getTextInputValue('steamContent');
                if (!steamContent) return await interaction.reply({ content: "작성이 취소되었습니다.", ephemeral: true });
                const userData = await userSchema.findOne({ guildId: interaction.guild.id, userId: interaction.member.id });
                if (userData) {
                    userData.steam = steamContent;
                    await userData.save();
                    return await interaction.reply({ content: "성공적으로 변경 하였습니다.", ephemeral: true });
                } else {
                    const newUserData = new userSchema({
                        guildId: interaction.guild.id,
                        userId: interaction.member.id,
                        steam: steamContent,
                        kakao: '',
                        loL: ''
                    });
                    await newUserData.save();
                    return await interaction.reply({ content: "성공적으로 등록 하였습니다.", ephemeral: true });
                }

            case 'kaKaoName':
                const kaKaoContent = interaction.fields.getTextInputValue('kaKaoContent');
                if (!kaKaoContent) return await interaction.reply({ content: "작성이 취소되었습니다.", ephemeral: true });
                const userDataK = await userSchema.findOne({ guildId: interaction.guild.id, userId: interaction.member.id });
                if (userDataK) {
                    userDataK.kakao = kaKaoContent;
                    await userDataK.save();
                    return await interaction.reply({ content: "성공적으로 변경 하였습니다.", ephemeral: true });
                } else {
                    const newUserData = new userSchema({
                        guildId: interaction.guild.id,
                        userId: interaction.member.id,
                        steam: '',
                        kakao: kaKaoContent,
                        loL: ''
                    });
                    await newUserData.save();
                    return await interaction.reply({ content: "성공적으로 등록 하였습니다.", ephemeral: true });
                }

            case 'loLName':
                const loLContent = interaction.fields.getTextInputValue('loLContent');

                if (!loLContent) return await interaction.reply({ content: "작성이 취소되었습니다.", ephemeral: true });
                const userDatal = await userSchema.findOne({ guildId: interaction.guild.id, userId: interaction.member.id });
                if (userDatal) {
                    userDatal.loL = loLContent;
                    await userDatal.save();
                    return await interaction.reply({ content: "성공적으로 변경 하였습니다.", ephemeral: true });
                } else {
                    const newUserData = new userSchema({
                        guildId: interaction.guild.id,
                        userId: interaction.member.id,
                        steam: '',
                        kakao: '',
                        loL: userDatal
                    });
                    await newUserData.save();
                    return await interaction.reply({ content: "성공적으로 등록 하였습니다.", ephemeral: true });
                }
        }
    }
};
