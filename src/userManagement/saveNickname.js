// // src/events/saveNickname.js

const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, Component } = require('discord.js');


async function guideMessageEdit(interaction) { // 목적 : 가이드 채널 메시지에서 메뉴를 선택했을 때, 셀렉트 메뉴의 선택하세요! 로 초기 값 만들게 하기 위함.
    const guideChannel = interaction.channel;
    const guideChannelMessage = await guideChannel.messages.fetch({ limit: 10 });
    const guideMessage = guideChannelMessage.find(message => message.content.includes('Wave 메인 명령어')); // 메시지 내용 중에 Wave 메인 명령어 가 있는 것만 가지고 온다.

    if (guideMessage) {
        guideMessage.edit({ components: [guideMessage.components[0]] });

    }
}

function getModalConfig(selectedValue) {

    let title, customId, label;

    switch (selectedValue) {
        case 'steam':
            title = "스팀 프로필 주소 또는 코드";
            customId = "steamCode";
            label = "Steam 친구 코드 또는 프로필 주소를 작성해주세요.";
            break;

        case 'riotGames':
            title = "라이엇 게임즈 닉네임";
            customId = "riotGamesName";
            label = "✔️ 최대 세개의 닉네임을 등록할 수 있습니다.";
            break;

        case 'steamBG':
            title = "스팀 배틀 그라운드 닉네임";
            customId = "steamBGName";
            label = "✔️ 최대 세개의 닉네임을 등록할 수 있습니다.";
            break;

        case 'kaKaoBG':
            title = "카카오 배틀 그라운드 닉네임";
            customId = "kaKaoBGName";
            label = "✔️ 최대 세개의 닉네임을 등록할 수 있습니다.";
            break;

        case 'overWatchTwo':
            title = "오버워치 2 닉네임";
            customId = "overWatchTwoName";
            label = "✔️ 최대 세개의 닉네임을 등록할 수 있습니다.";
            break;

        default:
            console.log('알 수 없는 선택 발생 : events/saveNickname.js ');
            break;
    }

    customId = customId + '-submitNickname';

    return { title, customId, label };
};


module.exports = async (interaction) => {
    if (interaction.isStringSelectMenu() && interaction.customId === "gameMenu") {

        try {
            guideMessageEdit(interaction);

            if (!interaction.values[0]) return;
            const selectedValue = interaction.values[0];

            let { title, customId, label } = getModalConfig(selectedValue);

            const modal = new ModalBuilder();
            modal.setTitle(title);
            modal.setCustomId(customId);

            const input = new TextInputBuilder()
                .setCustomId(customId)
                .setLabel(label)
                .setStyle(TextInputStyle.Short);

            const box = new ActionRowBuilder().addComponents(input);

            modal.addComponents(box);

            await interaction.showModal(modal);

        } catch (error) {
            console.error(error);
        }

    }
};
