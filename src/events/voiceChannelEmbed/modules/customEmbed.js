// customEmbed.js

const { EmbedBuilder } = require('discord.js');

const { emojiNames } = require('../../../module/server/emojiNames')
const emojiRegistrar = require('../../guildCreate/guildEmoji/emojiRegistrar');

// 이모지 맵을 저장할 변수
let emojiMap;


// 이모지 불러오기
async function loadEmojiMap(newState) {

    emojiMap = new Map();

    // 서버에 등록된 모든 이모지를 가져옵니다.
    const serverEmojis = newState.guild.emojis.cache;

    // emojiNames 배열에 정의된 이름을 가진 이모지를 찾습니다.
    const foundEmojis = emojiNames.map(name => serverEmojis.find(emoji => emoji.name === name)).filter(emoji => emoji);

    if (foundEmojis.length !== 7) {
        console.log('누락 된 이모지를 생성합니다.');
        await emojiRegistrar(newState.guild);

        return null;
    };


    // 찾은 이모지의 이름과 ID를 맵에 저장합니다.
    foundEmojis.forEach(emoji => {
        emojiMap.set(emoji.name, emoji.id);
        // console.log(`이름: ${emoji.name}, ID: ${emoji.id}`);
    });

    return emojiMap;
};



function loLCustom(nickname) {
    nickname = nickname.replace(/ /g, '%20');
    nickname = nickname.replace(/#/g, '-');

    return nickname;
};

function formatRiotTag(nickname) {
    // # 이 없다면 기본 값 #KR1
    if (nickname && !nickname.includes('#')) {
        nickname += '#KR1';
    };

    // 태그 이름
    let riotTag = nickname.split('#')[1];

    // 태그를 대문자로 변환
    let defaultTag = riotTag.toUpperCase();

    // kr1 -> KR1 로 변환 (일관성을 위해)
    if (defaultTag === 'KR1') {
        nickname = nickname.split('#')[0] + '#' + riotTag.toUpperCase();
    };

    return nickname;

};

// 모든 공백을 제거하고 반환
function removeSpaces(inputString) {
    return inputString.replace(/ /g, '');
};



function createFields(nickNames, guildData, emojiMap) {
    const fields = [];

    // 스팀
    if (guildData.steam && nickNames.steam.length > 0) {
        // 스팀 닉네임
        let steamNickName = nickNames.steam[0];

        let steamEmoji = emojiMap.get('wave_steam');

        // 스팀 닉네임이 주소인지 체크
        let steamLinkIncluded = steamNickName.includes("https://steamcommunity.com/");

        // 주소라면 클릭할 수 있는 링크, 친구 코드만 적었다면 클릭 없는 문자열
        fields.push({ name: 'Steam', value: steamLinkIncluded ? `<:wave_steam:${steamEmoji}> [스팀 친구 추가](${removeSpaces(steamNickName)})` : `<:wave_steam:${steamEmoji}> ${steamNickName}` });
    };

    // 라이엇 게임즈
    if (guildData.loL && nickNames.loL.length > 0 || guildData.tfT && nickNames.tfT.length > 0 || guildData.valorant && nickNames.valorant.length > 0) {

        let riotGames = '';
        let loLEmoji = emojiMap.get('wave_loL');
        let tfTEmoji = emojiMap.get('wave_tfT');
        let valorantEmoji = emojiMap.get('wave_valorant');

        nickNames.loL.forEach(nickname => {

            nickname = formatRiotTag(nickname);

            riotGames += `[<:wave_loL:${loLEmoji}> ${nickname}](https://www.op.gg/summoners/kr/${loLCustom(nickname)})\n`;
        });


        nickNames.tfT.forEach(nickname => {

            nickname = formatRiotTag(nickname);

            riotGames += `[<:wave_tfT:${tfTEmoji}> ${nickname}](https://lolchess.gg/profile/kr/${loLCustom(nickname)})\n`;
        });


        nickNames.valorant.forEach(nickname => {

            nickname = formatRiotTag(nickname);

            riotGames += `[<:wave_valorant:${valorantEmoji}> ${nickname}](https://valorant.op.gg/profile/${loLCustom(nickname)})\n`;
        });

        fields.push({ name: 'Riot Games', value: riotGames });
    };

    // 배틀 그라운드
    if (guildData.steamBG && nickNames.steamBG.length > 0) {
        let battleGround = '';
        let steamEmoji = emojiMap.get('wave_steamBG');
        let kakaoEmoji = emojiMap.get('wave_kakaoBG');

        nickNames.steamBG.forEach(nickname => {
            battleGround += `[<:wave_steamBG:${steamEmoji}> ${nickname}](https://pubg.op.gg/user/${removeSpaces(nickname)})\n`;
        });

        nickNames.kakao.forEach(nickname => {
            battleGround += `[<:wave_kakaoBG:${kakaoEmoji}> ${nickname}](https://dak.gg/pubg/profile/kakao/${removeSpaces(nickname)})\n`;
        });

        fields.push({ name: 'Battle Ground', value: battleGround });
    };



    // 오버워치 2
    if (guildData.overWatchTwo && nickNames.overWatchTwo.length > 0) {

        let Blizzard = '';

        let overWatchEmoji = emojiMap.get('wave_overWatchTwo');

        nickNames.overWatchTwo.forEach(nickname => {
            Blizzard += `<:wave_overWatchTwo:${overWatchEmoji}> ${nickname}\n`;
        });

        fields.push({ name: 'Blizzard', value: Blizzard });
    };


    return fields;
};

module.exports = async (newState, nickNames, guildData) => {

    const member = newState.member;

    // 이모지 맵 로드
    emojiMap = emojiMap || await loadEmojiMap(newState);
    if (!emojiMap) return;

    // .addFields
    const fields = createFields(nickNames, guildData, emojiMap);

    // 서버 별명 또는 유저 이름
    const displayName = member.nickname ? member.nickname : member.user.globalName;

    // 임베드 정의
    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setColor(0x0099FF)
        .setAuthor({ name: displayName, iconURL: member.user.displayAvatarURL(), url: member.user.avatarURL() })
        .addFields(fields)
        .setTimestamp(new Date(nickNames.updatedAt))
        .setFooter({ text: '―――――――― update', iconURL: 'https://koreanbots.dev/api/image/discord/avatars/1227561479801409566.webp?size=256' });

    return embed;
};