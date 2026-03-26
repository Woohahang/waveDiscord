const RESULT_CODES = {
    USER: {
        COMMON: {
            NOT_FOUND: 'USER_NOT_FOUND',
            // INVALID_STATE: 'USER_INVALID_STATE',
        },
        DELETE: {
            SUCCESS: 'USER_DELETE_SUCCESS',
        },
        REGISTER_NICKNAME: {
            SUCCESS: 'USER_REGISTER_NICKNAME_SUCCESS',
            DUPLICATE: 'USER_REGISTER_NICKNAME_DUPLICATE',
            LIMIT_EXCEEDED: 'USER_REGISTER_NICKNAME_LIMIT_EXCEEDED',
        },
        REMOVE_NICKNAME: {
            SUCCESS: 'USER_REMOVE_NICKNAME_SUCCESS',
            // NOT_FOUND: 'USER_REMOVE_NICKNAME_NOT_FOUND',
        },

    },

    // ADMIN: {
    //     NO_PERMISSION: 'ADMIN_NO_PERMISSION',
    // },

    // MENU: {
    //     NO_MENU_TO_SHOW: 'MENU_NO_MENU_TO_SHOW',
    //     NO_MENU_TO_HIDE: 'MENU_NO_MENU_TO_HIDE',
    // },

    // GUILD: {
    //     SETUP_COMPLETE: 'GUILD_SETUP_COMPLETE',
    // },
};

module.exports = RESULT_CODES;