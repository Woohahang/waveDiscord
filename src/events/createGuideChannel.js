const { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

const { gameMenuLoader } = require('../module/gameMenuLoader.js');

// 클릭 이벤트를 처리하는 클라이언트에 적용될 코드

function waveButton() {
    // const search = new ButtonBuilder()
    //     .setCustomId('userSearch')
    //     .setLabel('유저 검색')
    //     .setStyle(ButtonStyle.Primary)
    //     .setDisabled(true);

    const remove = new ButtonBuilder()
        .setCustomId('removeButton')
        .setLabel('닉네임 삭제')
        .setStyle(ButtonStyle.Primary)

    const waveLink = new ButtonBuilder()
        .setLabel('Wave 초대하기')
        .setURL('https://discord.com/oauth2/authorize?client_id=1227561479801409566&permissions=8&scope=bot+applications.commands')
        .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder()
        .addComponents(remove, waveLink);

    return row;
}

module.exports = async (guild) => {
    const channel = await guild.channels.create({ name: '📘ㆍwave', type: 0, });

    await channel.send({
        content: "## :star: Wave 메인 명령어\n## /닉네임등록  /닉네임삭제\n\n",
        components: [await gameMenuLoader()],
    });

    await channel.send({ components: [waveButton()] });
};

//"## 업데이트 계획\n- **/닉네임등록 의 게임 순서를 관리자가 변경할 수 있습니다.**\n**- /닉네임등록 의 목록을 추가 삭제 할 수 있습니다.**\n- **[ 사용자 정보 ] 의 목록 순서를 관리자가 변경할 수 있습니다.**\n- **[ 사용자 정보 ] 전적과 매칭된 티어가 나타날 예정입니다.**"