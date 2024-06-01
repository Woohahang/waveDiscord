// customEmbed.js

const { EmbedBuilder } = require('discord.js');

const { emojiNames } = require('../../../module/server/emojiNames')
const emojiRegistrar = require('../../guildCreate/guildEmoji/emojiRegistrar');

// 서버별로 이모지 맵을 저장할 변수
const emojiMaps = {};

// 이모지 불러오기
async function loadEmojiMap(newState) {
    const guildId = newState.guild.id;

    // 해당 서버의 이모지 맵 초기화
    emojiMaps[guildId] = new Map();

    // 서버에 등록된 모든 이모지를 가져옵니다.
    const serverEmojis = newState.guild.emojis.cache;

    // emojiNames 배열에 정의된 이름을 가진 이모지를 찾습니다.
    const foundEmojis = emojiNames.map(name => serverEmojis.find(emoji => emoji.name === name)).filter(emoji => emoji);

    if (foundEmojis.length !== 8) {
        console.log('누락 된 이모지를 생성합니다.');
        await emojiRegistrar(newState.guild);

        return null;
    };


    // 찾은 이모지의 이름과 ID를 맵에 저장합니다.
    foundEmojis.forEach(emoji => {
        emojiMaps[guildId].set(emoji.name, emoji.id);
    });

    return emojiMaps[guildId];
};


// 라이엇 주소 : 띄어쓰기 -> %20 변경, # -> - 변경
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

    // 한글 두 글자 닉네임에 대해 가운데에 띄어쓰기 추가
    let namePart = nickname.split('#')[0];
    if (/^[가-힣]{2}$/.test(namePart)) {
        namePart = namePart[0] + ' ' + namePart[1];
        nickname = namePart + '#' + riotTag;
    }

    return nickname;
};

// 모든 공백을 제거하고 반환
function removeSpaces(inputString) {
    return inputString.replace(/ /g, '');
};

function createFields(guildId, nickNames, guildData, emojiMaps) {
    const fields = [];

    // 스팀
    if (guildData.steam && nickNames.steam.length > 0) {
        // 스팀 닉네임
        let steamNickName = nickNames.steam[0];

        let steamEmoji = emojiMaps[guildId].get('wave_steam');

        // 스팀 닉네임이 주소인지 체크
        let steamLinkIncluded = steamNickName.includes("https://steamcommunity.com/");

        // 주소라면 클릭할 수 있는 링크, 친구 코드만 적었다면 클릭 없는 문자열
        fields.push({ name: 'Steam', value: steamLinkIncluded ? `<:wave_steam:${steamEmoji}> [스팀 친구 추가](${removeSpaces(steamNickName)})` : `<:wave_steam:${steamEmoji}> ${steamNickName}` });
    };

    // 라이엇 게임즈
    if (guildData.loL && nickNames.loL.length > 0 || guildData.tfT && nickNames.tfT.length > 0 || guildData.valorant && nickNames.valorant.length > 0) {

        let riotGames = '';
        let loLEmoji = emojiMaps[guildId].get('wave_loL');
        let tfTEmoji = emojiMaps[guildId].get('wave_tfT');
        let valorantEmoji = emojiMaps[guildId].get('wave_valorant');

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
        let steamEmoji = emojiMaps[guildId].get('wave_steamBG');
        let kakaoEmoji = emojiMaps[guildId].get('wave_kakaoBG');

        nickNames.steamBG.forEach(nickname => {
            battleGround += `[<:wave_steamBG:${steamEmoji}> ${nickname}](https://pubg.op.gg/user/${removeSpaces(nickname)})\n`;
        });

        nickNames.kakao.forEach(nickname => {
            battleGround += `[<:wave_kakaoBG:${kakaoEmoji}> ${nickname}](https://dak.gg/pubg/profile/kakao/${removeSpaces(nickname)})\n`;
        });

        fields.push({ name: 'Battle Ground', value: battleGround });
    };


    // 블리자드
    if (guildData.blizzard && nickNames.blizzard.length > 0 || guildData.overWatchTwo && nickNames.overWatchTwo.length > 0) {

        let Blizzard = '';

        let overWatchEmoji = emojiMaps[guildId].get('wave_overWatchTwo');
        let blizzardEmoji = emojiMaps[guildId].get('wave_blizzard');

        // 블리자드
        nickNames.blizzard.forEach(nickname => {
            Blizzard += `<:wave_blizzard:${blizzardEmoji}> ${nickname}\n`;
        });

        // 오버워치
        nickNames.overWatchTwo.forEach(nickname => {
            Blizzard += `<:wave_overWatchTwo:${overWatchEmoji}> ${nickname}\n`;
        });

        fields.push({ name: 'Blizzard', value: Blizzard });
    };


    return fields;
};

module.exports = async (newState, nickNames, guildData) => {

    const member = newState.member;
    const guildId = newState.guild.id;

    // 이모지 맵 로드
    emojiMaps[guildId] = emojiMaps[guildId] || await loadEmojiMap(newState);
    if (!emojiMaps[guildId]) return;

    // .addFields
    const fields = createFields(guildId, nickNames, guildData, emojiMaps);

    // 서버 별명 또는 유저 이름
    const displayName = member.nickname ? member.nickname : member.user.globalName;

    // 임베드 정의
    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setColor(0x0099FF)
        .setAuthor({ name: displayName, iconURL: member.user.displayAvatarURL(), url: member.user.avatarURL() })
        .addFields(fields)
        .setTimestamp(new Date(nickNames.updatedAt))
        .setFooter({ text: '―――――――― update', iconURL: 'https://drive.google.com/uc?export=view&id=19W-rsIvrkFJSJcZ7-PHXOfZcPRO1HYTi' });

    return embed;
};

// setInterval을 사용하여 24시간 마다 emojiMaps 초기화
setInterval(() => {
    Object.keys(emojiMaps).forEach(guildId => {
        delete emojiMaps[guildId]; // emojiMaps의 각 항목을 삭제하여 초기화
    });
    console.log('emojiMaps가 초기화되었습니다.');
}, 86_400_000); // 24시간은 86400000 밀리초