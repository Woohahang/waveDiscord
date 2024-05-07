// tests/index.test.js
const { Client, Collection, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { token, waveID } = require('../../config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] });
const connectToDatabase = require('../src/database.js');
client.commands = new Collection();
const userSchema = require('../src/models/userSchema.js');

// require('../src/index.js');
connectToDatabase();

async function removeEmptyFields(userDocument) {
    // 게임이 더 확장 되면 필드명 추가
    ['steam', 'kakao', 'riotGames'].forEach(field => {
        if (userDocument[field] === '') {
            userDocument[field] = undefined;
        }
    });

    await userDocument.save();
}

async function addDefaultRiotGames(userDocument) {
    if (userDocument.riotGames && !userDocument.riotGames.includes('#')) {
        userDocument.riotGames += '#KR1';
        await userDocument.save();
    }
}


function createFields(userDocument) {
    const fields = [];

    if (userDocument.steam) {
        // Steam 프로필 주소에 'https://steamcommunity.com/'이 포함되어 있으면, 링크로 표시합니다.
        // - 포함되어 있지 않으면, 친구 코드를 그대로 표시합니다.
        const includesSteamCommunity = userDocument.steam.includes("https://steamcommunity.com/");
        fields.push({
            name: 'Steam 프로필',
            value: includesSteamCommunity ? `[스팀 친구 추가](${userDocument.steam})` : userDocument.steam,
            inline: true
        });
    }

    if (userDocument.kakao) {
        fields.push({
            name: '카카오 배틀 그라운드',
            value: `[${userDocument.kakao}](https://dak.gg/pubg/profile/kakao/${userDocument.kakao})`,
            inline: true
        });
    }

    if (userDocument.riotGames) {
        fields.push({
            name: '리그 오브 레전드',
            value: `[${userDocument.riotGames}](https://www.op.gg/summoners/kr/${userDocument.riotGames})`,
            inline: true
        });
    }

    // 게임과 닉네임을 나타내는 정보를 세 개 이상 작성할 경우, 공백을 추가합니다.
    if (fields.length >= 3) {
        for (let i = 2; i < fields.length; i += 3) {
            fields.splice(i, 0, {
                name: ' ',
                value: ' ',
                inline: true
            });
        }
    }

    return fields;
}

client.on('voiceStateUpdate', async (oldState, newState) => {
    // return;
    if (oldState.channelId !== newState.channelId && newState.channelId !== null) {
        const user = newState.member.user;
        const userDocument = await userSchema.findOne({ guildId: newState.guild.id, userId: newState.id });
        const channel = newState.channel;

        if (!userDocument) {
            console.log("사용자 문서를 찾을 수 없습니다.");
            return
        };

        try {
            await removeEmptyFields(userDocument);
            await addDefaultRiotGames(userDocument);

            const fields = createFields(userDocument);

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('사용자 정보')
                .setColor(0x0099FF)
                .setAuthor({ name: user.globalName, iconURL: user.displayAvatarURL(), url: user.avatarURL() })
                .addFields(...fields, { name: '\u200B', value: '\u200B' })
                .setTimestamp(new Date(userDocument.updatedAt))
                .setFooter({ text: '━━━━━━━━━━━ update', iconURL: 'https://cdn-icons-png.flaticon.com/512/5052/5052710.png' });

            // 응답 받은 (음성 채널) 의 메시지 10개를 가지고 옵니다.
            const messages = await channel.messages.fetch({ limit: 10 });

            // wave bot 이 채팅 친 메세지 중에 embed 메세지들을 가지고 옵니다.
            const filterEmbeds = messages.filter(message => message.author.id === waveID && message.embeds.length > 0);

            // 중복된 임베드를 삭제합니다.
            filterEmbeds.forEach(message => {
                message.embeds.forEach(embed => {
                    if (embed.author.name == user.globalName && embed.author.url == user.avatarURL() && embed.author.iconURL == user.displayAvatarURL()) {
                        message.delete();
                        console.log("같은 정보 삭제");
                    }
                });
            });

            // 임베드 전송
            await channel.send({ embeds: [embed] });

        } catch (error) {
            console.error(`메시지를 보내는 중에 오류가 발생했습니다.! : ${error}`);
        }
    }

})


client.login(token);

/* 작업 목록
    1. 목표,
    - 팀 구성하기 ( 닉네임 등록 채팅 아래에 버튼 누르면 메뉴셀렉트유저 객체 이용해서 현재 참여 중인 인원만 띄우고 해보기 )
  
  

    - 메모
    1. Collection 객체는 일반적인 forEach 문법을 사용할 수 없습니다. 대신 .forEach() 메서드를 사용하여 반복 작업을 수행해야 합니다.
    2. discord.js 에서 지원하는 객체는 Collection 문법에 따를 것
        - ex) 임베드의 개수를 헤아릴 때 embeds.length --> embeds.size
*/

/* 계획
    - 본인 데이터 전체 삭제 or 닉네임 삭제

    1. 디스코드 서버 관리자가 음성 채널에 맞는 임베드만 나오도록 설정하는 기능 구현 계획

    2. 임베드 닉네임 옆에 레벨과 티어 문자열로 같이 나오게
        - 검색 후 티어 이미지 링크와 일치하는 변수를 담으면 될 것 같다.

    3. 티어에 맞는 역할 부여
        ex) 롤 다이아 -> 다이아 역할 자동 부여 (역할의 id를 변수로 담을 것, 이름은 바꿀 수 있게)
        관리자 기능 : 메뉴 선택에 다이아몬드 선택하면 또 메뉴가 나오면서 기존 역할 선택

    4. 전용 게임방을 위해 관리자가 손쉽게 닉네임 등록 메뉴를 원하는 것만 나오도록 선택하는 기능 구현
        ex) 롤방이면 닉네임 등록 ( 롤만 나오도록 )

    5. 홈페이지를 만들 때 야간 모드 ( 달 모양 아이콘 계획 ) 컨셉 : 밤과 낮을 파도, 바다에 맞게
*/

/* 선택
    1. 임베드 한줄에 내용 하나 or 두개
*/