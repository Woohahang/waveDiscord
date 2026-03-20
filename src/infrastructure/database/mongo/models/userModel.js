const mongoose = require('mongoose');
const GAME_TYPES = require('@constants/gameTypes');

/**
 * nickname 만 필요한 기본 게임 엔트리 스키마
 * 
 * @returns {{ nickname: { type: String, required: boolean } }}
 */
function createNicknameEntry() {
    return {
        nickname: {
            type: String,
            required: true
        }
    };
}

const userSchema = new mongoose.Schema({

    userId: { type: String, required: true, unique: true },

    // 스팀
    [GAME_TYPES.STEAM]: [{
        nickname: {             // Wave 에서 보여줄 Steam 표시 이름
            type: String,
            required: true
        },
        profileLink: {          // 해당 Steam 계정으로 연결되는 실제 프로필 주소
            type: String,
            required: true
        },
    }],

    // 리그오브레전드
    [GAME_TYPES.LEAGUE_OF_LEGENDS]: [{
        nickname: {
            type: String,
            required: true
        },
        tier: {
            type: String,
            enum: ["IRON", "BRONZE", "SILVER", "GOLD", "PLATINUM", "EMERALD", "DIAMOND", "MASTER", "GRANDMASTER", "CHALLENGER"]
        },
        rank: {
            type: String,
            enum: ["I", "II", "III", "IV"]
        },
        leaguePoints: {
            type: Number,
            default: 0,
        }
    }],

    // Teamfight Tactics
    [GAME_TYPES.TEAMFIGHT_TACTICS]: [createNicknameEntry()],

    // Valorant
    [GAME_TYPES.VALORANT]: [createNicknameEntry()],

    // Steam Battlegrounds
    [GAME_TYPES.STEAM_BATTLEGROUNDS]: [createNicknameEntry()],

    // Kakao Battlegrounds
    [GAME_TYPES.KAKAO_BATTLEGROUNDS]: [createNicknameEntry()],

    // Rainbow Six
    [GAME_TYPES.RAINBOW_SIX]: [createNicknameEntry()],

    // Blizzard
    [GAME_TYPES.BLIZZARD]: [createNicknameEntry()],

    // Overwatch 2
    [GAME_TYPES.OVERWATCH_2]: [createNicknameEntry()],

    // Lost Ark
    [GAME_TYPES.LOST_ARK]: [createNicknameEntry()]


}, {
    // .save() 함수를 사용하면 마지막 업데이트 시간을 자동 기록합니다.
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);