const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');
const userSchema = require('../models/userSchema.js');

async function showModalAndSaveData(interaction, title, customId, label, fieldKey) {
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

    if (interaction.isModalSubmit()) {
        const content = interaction.fields.getTextInputValue(`${customId}-content`);
        if (!content) return await interaction.reply({ content: "작성이 취소되었습니다.", ephemeral: true });

        let userData = await userSchema.findOne({ guildId: interaction.guild.id, userId: interaction.member.id });
        if (!userData) {
            userData = new userSchema({
                guildId: interaction.guild.id,
                userId: interaction.member.id,
                steam: '',
                kakao: '',
                loL: ''
            });
        }

        userData[fieldKey] = content;
        await userData.save();
        return await interaction.reply({ content: "성공적으로 변경 하였습니다.", ephemeral: true });
    }
}

module.exports = async (interaction) => {
    if (interaction.isStringSelectMenu() && interaction.customId === "gameSelectMenu") {
        const selectedValue = interaction.values[0];

        switch (selectedValue) {
            case 'steam':
                await showModalAndSaveData(
                    interaction,
                    "Steam 코드",
                    "steamCode",
                    "Steam 친구 코드를 작성해주세요.",
                    "steam"
                );
                break;

            case 'kaKaoBG':
                await showModalAndSaveData(
                    interaction,
                    "KaKao BG 닉네임",
                    "kaKaoName",
                    "KaKao Battle Grounds 닉네임을 작성해주세요.",
                    "kakao"
                );
                break;

            case 'loL':
                await showModalAndSaveData(
                    interaction,
                    "LoL 닉네임",
                    "loLName",
                    "League of Legends 닉네임을 작성해주세요.",
                    "loL"
                );
                break;

            default:
                console.log('알 수 없는 선택 발생 : events/saveNickname.js ');
                break;
        }
    }
};
