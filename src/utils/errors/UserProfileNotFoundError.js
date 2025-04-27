class UserProfileNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "UserProfileNotFoundError";
        this.code = "USER_PROFILE_NOT_FOUND";
    };
};

module.exports = UserProfileNotFoundError;