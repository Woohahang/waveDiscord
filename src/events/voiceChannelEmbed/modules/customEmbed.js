// customEmbed.js

const { EmbedBuilder } = require('discord.js');

// 서버별로 이모지 맵을 저장할 변수
const emojiMaps = {};



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
    try {

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
        if (guildData.leagueOfLegends || guildData.teamfightTactics || guildData.valorant) {

            let riotGames = '';
            let loLEmoji = emojiMaps[guildId].get('wave_leagueOfLegends');
            let tfTEmoji = emojiMaps[guildId].get('wave_teamfightTactics');
            let valorantEmoji = emojiMaps[guildId].get('wave_valorant');

            if (guildData.leagueOfLegends && nickNames.leagueOfLegends.length > 0) {
                nickNames.leagueOfLegends.forEach(nickname => {

                    nickname = formatRiotTag(nickname);

                    riotGames += `[<:wave_leagueOfLegends:${loLEmoji}> ${nickname}](https://www.op.gg/summoners/kr/${loLCustom(nickname)})\n`;
                });
            };

            if (guildData.teamfightTactics && nickNames.teamfightTactics.length > 0) {
                nickNames.teamfightTactics.forEach(nickname => {

                    nickname = formatRiotTag(nickname);

                    riotGames += `[<:wave_teamfightTactics:${tfTEmoji}> ${nickname}](https://lolchess.gg/profile/kr/${loLCustom(nickname)})\n`;
                });
            };

            if (guildData.valorant && nickNames.valorant.length > 0) {
                nickNames.valorant.forEach(nickname => {

                    nickname = formatRiotTag(nickname);

                    riotGames += `[<:wave_valorant:${valorantEmoji}> ${nickname}](https://valorant.op.gg/profile/${loLCustom(nickname)})\n`;
                });
            };

            if (riotGames.length !== 0)
                fields.push({ name: 'Riot Games', value: riotGames });
        };


        // 배틀 그라운드
        if (guildData.steamBattleGround || guildData.kakaoBattleGround) {
            let battleGround = '';
            let steamEmoji = emojiMaps[guildId].get('wave_steamBattleGround');
            let kakaoEmoji = emojiMaps[guildId].get('wave_kakaoBattleGround');

            if (guildData.steamBattleGround && nickNames.steamBattleGround.length > 0) {
                nickNames.steamBattleGround.forEach(nickname => {
                    battleGround += `[<:wave_steamBattleGround:${steamEmoji}> ${nickname}](https://pubg.op.gg/user/${removeSpaces(nickname)})\n`;
                });
            };

            if (guildData.kakaoBattleGround && nickNames.kakaoBattleGround.length > 0) {
                nickNames.kakaoBattleGround.forEach(nickname => {
                    battleGround += `[<:wave_kakaoBattleGround:${kakaoEmoji}> ${nickname}](https://dak.gg/pubg/profile/kakao/${removeSpaces(nickname)})\n`;
                });
            };

            if (battleGround.length !== 0)
                fields.push({ name: 'Battle Ground', value: battleGround });

        };



        // 블리자드
        if (guildData.overWatchTwo || guildData.blizzard) {

            let blizzard = '';

            let overWatchEmoji = emojiMaps[guildId].get('wave_overWatchTwo');
            let blizzardEmoji = emojiMaps[guildId].get('wave_blizzard');

            // 블리자드
            if (nickNames.blizzard.length > 0) {
                nickNames.blizzard.forEach(nickname => {
                    blizzard += `<:wave_blizzard:${blizzardEmoji}> ${nickname}\n`;
                });
            };

            // 오버워치
            if (nickNames.overWatchTwo.length > 0) {
                nickNames.overWatchTwo.forEach(nickname => {
                    blizzard += `<:wave_overWatchTwo:${overWatchEmoji}> ${nickname}\n`;
                });
            };

            if (blizzard.length !== 0)
                fields.push({ name: 'Blizzard', value: blizzard });
        };

        return fields;
    } catch (error) {
        console.error('customEmbed.js 에서 createFields 에러 : ', error);
    };
};

function loadEmojiMap(newState) {
    try {
        const guildId = newState.guild.id;

        // 해당 서버의 이모지 맵 초기화
        emojiMaps[guildId] = new Map();

        // 서버에 등록된 모든 이모지를 가져옵니다.
        const serverEmojis = newState.guild.emojis.cache;

        // Wave 이모지만 가지고 옵니다.
        const waveEmojis = serverEmojis.filter(emoji => emoji.name.split('_')[0] === 'wave');

        // 길드 id가 key 맵에 이모지 이름, 이모지 id 저장
        waveEmojis.forEach(emoji => {
            emojiMaps[guildId].set(emoji.name, emoji.id);
        });

        return emojiMaps[guildId]
    } catch (error) {
        throw console.error('customEmbed.js 의 loadEmojiMap 에러 : ', error);
    };
};

const filterOptions = require('../../../module/data/filterOptions');

async function checkEmoji(newState, guildData) {
    const trueValueGames = filterOptions(guildData, true);
    const guild = newState.guild;

    // 서버에 등록된 모든 이모지를 가져옵니다.
    const serverEmojis = await guild.emojis.fetch();

    // 서버에 등록 된 Wave 이모지 이름들을 가지고 옵니다.
    const waveEmojis = serverEmojis.filter(emoji => emoji.name.split('_')[0] === 'wave').map(emoji => emoji.name);

    // 만약 옛날 이모지가 있다면 리턴합니다.
    const returnEmoji = waveEmojis.filter(emoji => emoji === 'wave_loL' || emoji === 'wave_kakaoBG' || emoji === 'wave_steamBG' || emoji === 'wave_tfT');

    if (trueValueGames.length === waveEmojis.length && returnEmoji.length === 0) {
        return true;
    } else {
        console.log('이모지 업데이트 해주세요.');
        return false;
    };

};

module.exports = async (newState, nickNames, guildData) => {
    try {
        const member = newState.member;
        const guildId = newState.guild.id;

        // 서버 별명 또는 유저 이름
        let displayName = member.nickname ? member.nickname : member.user.globalName;

        let fields;

        const emojiUpdate = await checkEmoji(newState, guildData);
        if (emojiUpdate) {

            emojiMaps[guildId] = loadEmojiMap(newState);

            // .addFields
            fields = createFields(guildId, nickNames, guildData, emojiMaps);

        } else {
            fields = ({ name: '⭐ 업데이트 필요', value: '관리자님, 업데이트 버튼 한 번 눌러주세요.\n 자세한 내용은 Wave Discord에서 안내해 드리겠습니다.' });
        };

        if (!fields) return;

        // 임베드 정의
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setColor(0x0099FF)
            .setAuthor({ name: displayName, iconURL: member.user.displayAvatarURL(), url: member.user.avatarURL() })
            .addFields(fields)
            .setTimestamp(new Date(nickNames.updatedAt))
            .setFooter({ text: '―――――――― update', iconURL: 'https://drive.google.com/uc?export=view&id=19W-rsIvrkFJSJcZ7-PHXOfZcPRO1HYTi' });

        return embed;
    } catch (error) {
        console.error('customEmbed.js 에러 : ', error);
    };
};

// setInterval을 사용하여 24시간 마다 emojiMaps 초기화
setInterval(() => {
    Object.keys(emojiMaps).forEach(guildId => {
        delete emojiMaps[guildId]; // emojiMaps의 각 항목을 삭제하여 초기화
    });
    console.log('emojiMaps가 초기화되었습니다.');
}, 86_400_000); // 24시간은 86400000 밀리초