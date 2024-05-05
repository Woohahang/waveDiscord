const { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

const { adminMenuLoader } = require('../module/adminModules/adminMenuLoader.js');
const { adminButton } = require('../module/adminModules/adminButton.js');

/*
    [ 메뉴 계획 ] 메뉴 보이기 | 메뉴 숨기기 | 메뉴 순서 바꾸기 | 역할 매칭?
    [ 버튼 계획 ] 업데이트 | 문의하기


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

        await channel.send({ content: '> * **채널 보기 권한 OFF 적용 상태 **\n> * **채널을 옮기는 과정** 중에 권한이 풀릴 수도 있습니다.' });

    } catch (error) {
        console.error(error);
    }
};

/*
1. 관리자만 조작할 수 있도록 기능 구현
    - 비트필드 조작은 안 될듯?
    - 유저 객체 얻기
    - 유저 역할 얻기
    - if 관리자가 있다면 작동 가능 ( 이벤트 영역에 넣어야 될듯? )
 
2. 업데이트
    - 

*/