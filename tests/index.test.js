// tests/index.test.js
const { Client, Collection, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { token, waveID } = require('../../config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] });
const connectToDatabase = require('../src/database.js');
client.commands = new Collection();
const userSchema = require('../src/models/userSchema.js');

// require('../src/index.js');
connectToDatabase();

client.on('voiceStateUpdate', async (oldState, newState) => {
    return;
    if (oldState.channelId !== newState.channelId && newState.channelId !== null) {
        const memememe = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('테스트 정보')

        const channel = newState.channel;
        try {
            const messages = await channel.messages.fetch(); // 채널의 메시지를 가지고 온다.
            const embedMessages = messages.filter(message => message.author.id === waveID && message.embeds.length > 0); // 메시지 정보 중에 임베드 길이가 0보다 크면 가지고 온다.

            // 가지고 온 메시지를 다 삭제한다.
            embedMessages.forEach(async embedMessage => {
                await embedMessage.delete();
                console.log("이전 임베드 메시지가 성공적으로 삭제되었습니다.");
            });

            // 새로운 임베드 메시지를 보냅니다.
            await channel.send({ embeds: [memememe] });
            console.log("새로운 임베드 메시지가 성공적으로 전송되었습니다.");

        } catch (error) {
            console.error(`메시지를 보내는 중에 오류가 발생했습니다. : ${error}`);
        }
    }
})

function setDefaultValues(userDocument) {  // DB 데이터가 비어 있으면 - 값 적용, 이유 : null 이거나 '' 면 .addFields 의 value가 깨진다.

    userDocument.kakao = userDocument.kakao || '-';
    userDocument.steam = userDocument.steam || '-';
    userDocument.loL = userDocument.loL || '-';

}

client.on('voiceStateUpdate', async (oldState, newState) => {
    // return;
    if (oldState.channelId !== newState.channelId && newState.channelId !== null) {

        const user = newState.member.user;
        const userDocument = await userSchema.findOne({ guildId: newState.guild.id, userId: newState.id });
        if (!userDocument) return console.log(`사용자의 사용자 프로필을 찾을 수 없습니다. ${newState.id}`);
        setDefaultValues(userDocument);
        const channel = newState.channel;

        const embedMessage = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('사용자 정보')
            .setColor(0x0099FF)
            .setAuthor({ name: user.globalName, iconURL: user.displayAvatarURL(), url: user.avatarURL() })
            .addFields(
                { name: 'Steam 프로필', value: '[스팀 친구 추가](https://steamcommunity.com/profiles/76561198311685982/)', inline: true },
                { name: '카카오 배틀 그라운드', value: `[${userDocument.kakao}](https://dak.gg/pubg/profile/kakao/${userDocument.kakao})`, inline: true },
                { name: ' ', value: ' ' },
                { name: '리그 오브 레전드', value: `[${userDocument.loL}](https://www.op.gg/summoners/kr/${userDocument.loL})`, inline: true },
                { name: '발로란트', value: `[-](https://dak.gg/valorant/profile/)`, inline: true },
                { name: '\u200B', value: '\u200B' }
            )
            .setTimestamp(userDocument.updatedAt)
            .setFooter({ text: '━━━━━━━━━━━ update', iconURL: 'https://cdn-icons-png.flaticon.com/512/5052/5052710.png' });

        try {
            await channel.send({ embeds: [embedMessage] });
        } catch (error) {
            console.error(`메시지를 보내는 중에 오류가 발생했습니다.! : ${error}`);
        }
    }

})

client.login(token);

/* 작업 목록
    1. 테스트 폴더 생성
    임베드 업데이트 계획 : 하나의 임베드에 채널의 유저 정보 업데이트.
    값이 없는 필드는 생략.
    
    2. 임베드 메시지가 이미 존재한다면 삭제 후 새로운 메시지 전송
    
    3. userSchema 수정
    userSchema.updatedAt 접근 시, 의도와 맞지 않게 현재 시간만 내보내던 점을 마지막 업데이트 시각이 나오도록 수정.

    4. userSchema 기본 값 추가
    loL 필드에 '#'이 없는 경우 자동으로 '#KR1'을 추가하여 기본 값 설정
*/
