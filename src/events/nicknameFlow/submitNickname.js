const UserSettings = require('../../services/UserSettings');
const logger = require('@utils/logger');
const getStateMessage = require('@shared/utils/stateMessage');
const RIOT_GAMES = require('@constants/riotGames')
const GAME_TYPES = require('@constants/gameTypes');
const fetchSteamProfile = require('../../shared/api/fetchSteamProfile');
const ERROR_KEY = require('@constants/errorKeys');
const STATE_KEYS = require('@constants/stateKeys');

/**
 * Riot Tag를 포맷팅합니다.
 * 
 * - 'KR1' 태그는 대문자로 통일
 * - 닉네임이 2글자일 경우 중간에 공백 추가
 * 
 * @param {string} nickname - '닉네임#태그' 형식의 문자열
 * @returns {string} 포맷팅된 Riot Tag
 */
function formatRiotTag(nickname) {
    let [name, tag] = nickname.split('#');

    // 'kr1' 또는 'kR1' 등은 'KR1'로 통일
    if (tag.toUpperCase() === 'KR1')
        tag = 'KR1';

    // 닉네임이 두 글자일 경우 중간에 공백 삽입
    if (name.length === 2)
        name = `${name[0]} ${name[1]}`;

    return `${name}#${tag}`;
};

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
function getNicknameValidationError(gameType, rawNickname) {
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
 * 닉네임 사용 가능 여부를 확인하고, 문제가 있을 경우 상태 키를 반환합니다.
 *
 * - 중복된 닉네임인지 확인
 * - 게임별 닉네임 등록 제한(최대 5개) 확인
 *
 * @param {Object} userData - 사용자의 게임별 닉네임 데이터
 * @param {string} gameType - 게임 종류 (예: LEAGUE_OF_LEGENDS, STEAM 등)
 * @param {string} nickname - 저장하려는 닉네임 또는 유저 식별자
 * @returns {string|null} 상태 키 (중복 또는 제한 초과 시), 없으면 null
 */
function getNicknameAvailabilityError(userData, gameType, nickname) {

    // 닉네임 중복 검사
    if (GAME_TYPES.LEAGUE_OF_LEGENDS === gameType) {
        // 리그오브레전드는 닉네임 중복을 summonerName 필드를 기준으로 판단
        if (userData[gameType].some(entry => entry.summonerName === nickname))
            return STATE_KEYS.NICKNAME_SAVE_DUPLICATE;
    }
    else {
        if (userData[gameType].includes(nickname))
            return STATE_KEYS.NICKNAME_SAVE_DUPLICATE;
    }

    // 닉네임 저장 갯수 5개 초과 검사
    if (userData[gameType].length >= 5)
        return STATE_KEYS.NICKNAME_SAVE_LIMIT_EXCEEDED;

    // 에러 없음
    return null;
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
        const validationErrorKey = getNicknameValidationError(gameType, rawNickname);
        if (validationErrorKey) return await interaction.editReply({ content: getStateMessage(validationErrorKey), ephemeral: true });

        // 게임 타입에 맞는 닉네임 포맷터
        const formattedNickname = formatNicknameByGame(gameType, rawNickname);

        // 게임 유저 정보 조회 (게임 타입별)
        const nickname = await fetchGameUserInfo(gameType, formattedNickname);

        // 유저 설정 객체 생성 및 닉네임 DB 저장
        const userSettings = new UserSettings(userId);
        const userData = await userSettings.loadOrCreateUserData();

        // 닉네임 사용 가능 여부 확인
        const availabilityErrorKey = getNicknameAvailabilityError(userData, gameType, nickname);
        if (availabilityErrorKey) return await interaction.editReply({ content: getStateMessage(availabilityErrorKey), ephemeral: true });

        // 닉네임이 유효하다면, 해당 닉네임을 DB에 저장
        await userSettings.saveNickname(gameType, nickname);

        // 결과 메시지 전송
        await interaction.editReply({ content: getStateMessage(STATE_KEYS.NICKNAME_SAVE_SUCCESS), ephemeral: true });

    } catch (error) {
        logger.error('[submitNickname] 닉네임 저장 중 오류 발생', {
            userId,
            gameType,
            rawNickname,
            stack: error.stack
        });
    };
};