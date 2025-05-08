const UserSettings = require('../../../services/UserSettings');
const logger = require('@utils/logger');
const getStateMessage = require('@shared/utils/stateMessage');
const RIOT_GAMES = require('@constants/riotGames')
const formatRiotTag = require('../nickNameModules/formatRiotTag');
const GAME_TYPES = require('@constants/gameTypes');
const fetchSteamProfile = require('../nickNameModules/fetchSteamProfile');
const ERROR_KEY = require('@constants/errorKeys');

/**
 * 라이엇 태그 포맷 검사 정규식
 * - 닉네임: 1~16자, 태그: 1~5자
 * - 허용 문자: 유니코드 문자, 숫자, 공백
 * - 형식 예: "Hide on bush#KR1"
 */
const RIOT_TAG_REGEX = /^[\p{L}0-9 ]{1,16}#[\p{L}0-9 ]{1,5}$/u;

/**
 * 스팀 프로필 링크 유효성 검사
 * - 허용 형식: https://steamcommunity.com/id/xxx 또는 /profiles/xxx
 */
function isValidSteamLink(link) {
    return /\/(id|profiles)\/[^\/]+/.test(link);
}

/**
 * 닉네임 유효성 검사
 * - 게임 종류에 따라 입력값의 형식이 맞는지 확인
 * - 오류가 있을 경우 ERROR_KEY 반환, 없으면 null 반환
 */
function validateNickname(gameType, rawNickname) {
    if (RIOT_GAMES.includes(gameType)) {

        if (!RIOT_TAG_REGEX.test(rawNickname))
            return ERROR_KEY.INVALID_RIOT_TAG_FORMAT;
    }

    if (GAME_TYPES.STEAM === gameType) {
        if (!isValidSteamLink(rawNickname))
            return ERROR_KEY.INVALID_STEAM_PROFILE_LINK;
    }

    return null;
}

/**
 * 게임 종류에 따라 사용자 정보를 가져옴
 * - 스팀은 프로필 정보를 API로 가져옴
 * - 라이엇 등은 그대로 반환
 */
async function fetchGameUserInfo(gameType, formattedNickname) {
    if (GAME_TYPES.STEAM === gameType)
        return await fetchSteamProfile(formattedNickname);

    return formattedNickname;
}

/**
 * 게임 타입에 맞는 닉네임 포맷터
 * @param {string} gameType 
 * @param {string} rawNickname 
 * @returns {string}
 */
function formatNicknameByGame(gameType, rawNickname) {
    switch (gameType) {
        case GAME_TYPES.LEAGUE_OF_LEGENDS:
        case GAME_TYPES.VALORANT:
        case GAME_TYPES.TEAMFIGHT_TACTICS:
            return formatRiotTag(rawNickname);

        // TODO: 블리자드, 스팀 등 추가 가능

        default:
            return rawNickname;
    }
}

/**
 * 사용자의 닉네임 입력을 처리하고, 게임 종류에 따라 전처리 후 DB에 저장합니다.
 */
module.exports = async (interaction) => {

    // 유저 ID 및 게임 종류, 입력된 닉네임 추출
    const userId = interaction.member.id;
    const gameType = interaction.customId.split('_')[1];
    let rawNickname = interaction.fields.getTextInputValue('nicknameInput');

    try {
        // 응답을 지연시켜 '처리 중...' 표시
        await interaction.deferReply({ ephemeral: true });

        // 닉네임 유효성 검사
        let errorKey = validateNickname(gameType, rawNickname);
        if (errorKey) return await interaction.editReply({ content: getStateMessage(errorKey), ephemeral: true });

        // 게임 타입에 맞는 닉네임 포맷터
        const formattedNickname = formatNicknameByGame(gameType, rawNickname);

        // 게임 유저 정보 조회 (게임 타입별)
        const nickname = await fetchGameUserInfo(gameType, formattedNickname);

        // 유저 설정 객체 생성 및 닉네임 DB 저장
        const userSettings = new UserSettings(userId);
        const resultKey = await userSettings.userNicknameSaver(gameType, nickname);

        // 결과 메시지 전송
        await interaction.editReply({ content: getStateMessage(resultKey), ephemeral: true });

    } catch (error) {
        logger.error('[processAndSaveNickname] 닉네임 저장 중 오류 발생', {
            userId,
            gameType,
            rawNickname,
            stack: error.stack
        });
    };
};