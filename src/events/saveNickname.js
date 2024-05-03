// // src/events/saveNickname.js

const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, Component } = require('discord.js');
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

async function guideMessageEdit(interaction) { // 목적 : 가이드 채널 메시지에서 메뉴를 선택했을 때, 선택하세요! 초기 값으로 만들게 하기 위함.
    const guideChannel = interaction.channel;
    const guideChannelMessage = await guideChannel.messages.fetch();
    const guideMessage = guideChannelMessage.find(message => message.content.includes('Wave 메인 명령어')); // 메시지 내용 중에 Wave 메인 명령어 가 있는 것만 가지고 온다.

    if (guideMessage) {
        guideMessage.edit({ components: [guideMessage.components[0]] });

    }
}

module.exports = async (interaction) => {
    if (interaction.isStringSelectMenu() && interaction.customId === "gameMenu") {

        guideMessageEdit(interaction);

        if (!interaction.values[0]) return;
        const selectedValue = interaction.values[0];

        let title, customId, label;
        switch (selectedValue) {
            case 'steam':
                title = "스팀 프로필 주소 또는 코드";
                customId = "steamCode";
                label = "Steam 친구 코드를 작성해주세요.";
                break;

            case 'kaKaoBG':
                title = "카카오 배틀 그라운드 닉네임";
                customId = "kaKaoName";
                label = "KaKao Battle Grounds 닉네임을 작성해주세요.";
                break;

            case 'riotGames':
                title = "라이엇 게임즈 닉네임";
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
        let content = interaction.fields.getTextInputValue(`${customId}-content`);

        if (!content) return await interaction.reply({ content: "작성이 취소되었습니다.", ephemeral: true });

        let userData = await userSchema.findOne({ userId: interaction.member.id });

        // userData 가 없으면 만든다.
        if (!userData) {
            userData = new userSchema({ userId: interaction.member.id });
            await userData.save();
        }

        let limitReached = false;
        switch (customId) {
            case 'steamCode':
                userData.steam = content.substr(0, 100);
                break;

            case 'kaKaoName':
                if (userData.kakao.length > 2) {
                    limitReached = true;
                } else {
                    userData.kakao.push(content.substr(0, 20));
                }
                break;

            case 'riotGamesName':
                if (userData.riotGames.length > 2) {
                    limitReached = true;
                } else {
                    userData.riotGames.push(content.substr(0, 20));
                    break;
                }
        }

        if (limitReached) {
            return await interaction.reply({ content: "해당 항목의 데이터는 이미 제한에 도달했습니다.", ephemeral: true });
        } else {
            await userData.save();
            return await interaction.reply({ content: "성공적으로 변경 하였습니다.", ephemeral: true });
        }

    }
};
