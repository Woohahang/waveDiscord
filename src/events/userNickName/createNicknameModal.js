// /saveNickname.js

const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');
const { menuSelectionResetter } = require('../../module/common/menuSelectionResetter');

const modalConfigs = {
    steam: { title: "스팀 프로필 주소 또는 코드", customId: "steam", label: "Steam 친구 코드 또는 프로필 주소를 작성해주세요." },
    loL: { title: "리그 오브 레전드 닉네임", customId: "loL", label: "✔️ 최대 다섯 개의 닉네임을 등록할 수 있습니다." },
    tfT: { title: '롤토체스', customId: 'tfT', label: '✔️ 최대 다섯 개의 닉네임을 등록할 수 있습니다.' },
    steamBG: { title: '스팀 배틀 그라운드 닉네임', customId: 'steamBG', label: '✔️ 최대 다섯 개의 닉네임을 등록할 수 있습니다.' },
    kaKaoBG: { title: '카카오 배틀 그라운드 닉네임', customId: 'kakao', label: '✔️ 최대 다섯 개의 닉네임을 등록할 수 있습니다.' },
    overWatchTwo: { title: '오버워치 2 닉네임', customId: 'overWatchTwo', label: '✔️ 최대 다섯 개의 닉네임을 등록할 수 있습니다.' },
};

// 유저가 선택한 메뉴에 맞는 셋팅 가지고 오기
function getModalConfig(gameTitle) {
    const config = modalConfigs[gameTitle];
    if (!config) {
        console.log('알 수 없는 선택 발생: events/saveNickname.js');
        return null;
    };

    // 펼쳐서 수정하고 리턴
    return { ...config, customId: `submitNickname_${config.customId}` };
};

// 제목, 내용, id  모달에 집어 넣기
function buildModal({ title, customId, label }) {
    const modal = new ModalBuilder().setTitle(title).setCustomId(customId);

    const input = new TextInputBuilder()
        .setCustomId(customId)
        .setLabel(label)
        .setStyle(TextInputStyle.Short);
    const box = new ActionRowBuilder().addComponents(input);

    modal.addComponents(box);
    return modal;
};

module.exports = async (interaction) => {
    try {
        if (interaction.values[0] === 'noOptions') {
            interaction.deferUpdate();

            await menuSelectionResetter(interaction);
            return;
        };

        // 게임 이름
        const gameTitle = interaction.values[0];

        // 모달 제목, 라벨, Id 들고옴
        const modalConfig = getModalConfig(gameTitle);

        // 모달에 집어 넣기
        const modal = buildModal(modalConfig);

        // 모달 띄우기
        await interaction.showModal(modal);

        // 메뉴 초기화
        await menuSelectionResetter(interaction);

    } catch (error) {
        console.error('createNicknameModal.js 예외 : ', error);
    };
};