const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const gameMenuLoader = require('../module/gameMenuLoader.js');

function waveButton() {
    const button = new ButtonBuilder()
        .setLabel('Wave 초대하기')
        .setURL('https://discord.com/oauth2/authorize?client_id=1227561479801409566&permissions=8&scope=bot+applications.commands')
        .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder()
        .addComponents(button);

    return row;
}

module.exports = async (guild) => {
    const channel = await guild.channels.create({
        name: '📘ㆍwave',
        type: 0,
    });

    await channel.send(
        "## :star: Wave 메인 명령어\n## /닉네임등록  /닉네임삭제\n\n* 더 편리한 기능을 업데이트하고 있습니다.\n\n"
    );

    await channel.send({
        // content: `Are you sure you want to ban ${target} for reason: ${reason}?`,
        components: [waveButton()],
    });





    console.log('Wave 채널을 생성하고 메시지를 보냈습니다.');

    // await channel.send(gameMenuLoader());

    // await guild.channel.send({
    //     content: '## 닉네임을 등록할 게임을 선택해주세요!',
    //     components: [row],
    // });

};

//"## 업데이트 계획\n- **/닉네임등록 의 게임 순서를 관리자가 변경할 수 있습니다.**\n**- /닉네임등록 의 목록을 추가 삭제 할 수 있습니다.**\n- **[ 사용자 정보 ] 의 목록 순서를 관리자가 변경할 수 있습니다.**\n- **[ 사용자 정보 ] 전적과 매칭된 티어가 나타날 예정입니다.**"