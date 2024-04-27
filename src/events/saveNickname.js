// // src/events/saveNickname.js

const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');
const userSchema = require('../models/userSchema.js');

async function showModalAndSaveData(interaction, title, customId, label) {
    const modal = new ModalBuilder();
    modal.setTitle(title);
    modal.setCustomId(customId);

    const input = new TextInputBuilder()
        .setCustomId(`${customId}-content`)
        .setLabel(label)
        .setStyle(TextInputStyle.Short);

    const box = new ActionRowBuilder().addComponents(input);

    modal.addComponents(box);

    await interaction.showModal(modal);
}

module.exports = async (interaction) => {
    if (interaction.isStringSelectMenu() && interaction.customId === "gameMenu") {
        const selectedValue = interaction.values[0];

        let title, customId, label;
        switch (selectedValue) {
            case 'steam':
                title = "Steam 코드";
                customId = "steamCode";
                label = "Steam 친구 코드를 작성해주세요.";
                break;

            case 'kaKaoBG':
                title = "KaKao BG 닉네임";
                customId = "kaKaoName";
                label = "KaKao Battle Grounds 닉네임을 작성해주세요.";
                break;

            case 'riotGames':
                title = "riotGames 닉네임";
                customId = "riotGamesName";
                label = "League of Legends 닉네임을 작성해주세요.";
                break;

            default:
                console.log('알 수 없는 선택 발생 : events/saveNickname.js ');
                break;
        }

        if (title && customId && label) {
            await showModalAndSaveData(interaction, title, customId, label);
        }
    }

    // 모달 제출 여부 확인
    if (interaction.isModalSubmit()) {
        const customId = interaction.customId.split('-')[0]; // "-content" 부분 제거
        const content = interaction.fields.getTextInputValue(`${customId}-content`);

        if (!content) return await interaction.reply({ content: "작성이 취소되었습니다.", ephemeral: true });

        let userData = await userSchema.findOne({ guildId: interaction.guild.id, userId: interaction.member.id }) || new userSchema({
            guildId: interaction.guild.id,
            userId: interaction.member.id,
            steam: '',
            kakao: '',
            riotGames: ''
        });

        switch (customId) {
            case 'steamCode':
                userData.steam = content;
                break;

            case 'kaKaoName':
                userData.kakao = content;
                break;

            case 'riotGamesName':
                userData.riotGames = content;
                break;
        }

        await userData.save();
        return await interaction.reply({ content: "성공적으로 변경 하였습니다.", ephemeral: true });
    }
};
