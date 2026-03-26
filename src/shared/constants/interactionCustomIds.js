/**
 * customId 규칙
 * [context]:[action]:[target]
 *
 * context: 누가 / 어떤 도메인에서 발생했는가
 * action: 어떤 행동을 하려는가
 * target: 무엇을 선택/클릭했는가
 */

const CUSTOM_IDS = {
    USER: {
        REGISTER_NICKNAME: {
            SELECT_GAME: 'user:register-nickname:select-game',              // 유저가 닉네임 등록하기 위한 게임선택 메뉴
            SUBMIT: 'user:register-nickname:submit'                         // 유저가 닉네임 등록을 위해 모달에서 제출
        },

        REMOVE_NICKNAME: {
            SELECT_NICKNAMES: 'user:remove-nickname:select-nicknames',      // 유저가 닉네임 삭제하기 위한 닉네임선택 메뉴
            BUTTON: 'user:remove-nickname:button'
        },

        INFO: {
            BUTTON: 'user:open-info:button',   // "내 정보" 버튼
            SELECT: 'user:select-info:menu',   // "내 정보" 메뉴
        }
    },

    GUILD: {
        GAME_VISIBILITY: {
            SHOW_SELECT: 'guild:show-game:select',
            HIDE_SELECT: 'guild:hide-game:select',
        },
    },
};

module.exports = CUSTOM_IDS;