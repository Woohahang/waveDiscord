const { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

function adminMenuLoader() {

    let adminMenuSelect = new StringSelectMenuBuilder()
        .setCustomId('adminMenuId')
        .setPlaceholder('메뉴를 선택하세요')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('ShowMenu')
                .setDescription('메뉴 보이기')
                .setValue('showMenu'),

            new StringSelectMenuOptionBuilder()
                .setLabel('HideMenu')
                .setDescription('메뉴 숨기기')
                .setValue('hideMenu'),

            new StringSelectMenuOptionBuilder()
                .setLabel('ChangeOrder')
                .setDescription('메뉴 순서 바꾸기')
                .setValue('changeOrder'),
        );

    let row = new ActionRowBuilder()
        .addComponents(adminMenuSelect);

    return row;

}

function adminButton() {

    const upDate = new ButtonBuilder()
        .setCustomId('upDate')
        .setLabel('업데이트')
        .setStyle(ButtonStyle.Primary)
        .setDisabled(true);

    const checkLogs = new ButtonBuilder()
        .setCustomId('checkLogs')
        .setLabel('로그 확인')
        .setStyle(ButtonStyle.Success)
        .setDisabled(true);

    const contactSupport = new ButtonBuilder()
        .setLabel('문의 하기')
        .setURL('https://discord.gg/kuuWBEjun6')
        .setStyle(ButtonStyle.Link)

    const row = new ActionRowBuilder()
        .addComponents(checkLogs, contactSupport, upDate);

    return row;

}

/*
    [ 메뉴 계획 ] 메뉴 보이기 | 메뉴 숨기기 | 메뉴 순서 바꾸기 | 역할 매칭?
    [ 버튼 계획 ] 로그 확인 | 업데이트 | 문의하기


    [ 추가사항 ] 시은
    1. 음성 채널 입장 총 시간(이벤트 용도)
    2. 유저 입장 시간

*/


module.exports = async (guild) => {

    try {
        // 채널 이름
        const channel = await guild.channels.create({ name: '📘ㆍwave 관리자', type: 0 });

        // 메시지 보내기 off
        channel.permissionOverwrites.create(channel.guild.roles.everyone, { ViewChannel: false, SendMessages: false });

        await channel.send({
            content: "## ⭐ Wave 관리자 채널",
            components: [adminMenuLoader(), adminButton()],
        })

    } catch (error) {
        console.error(error);
    }
}


/*
1. 관리자만 조작할 수 있도록 기능 구현
    - 비트필드 조작은 안 될듯?
    - 유저 객체 얻기
    - 유저 역할 얻기
    - if 관리자가 있다면 작동 가능 ( 이벤트 영역에 넣어야 될듯? )
 
2. 업데이트
    - 

*/