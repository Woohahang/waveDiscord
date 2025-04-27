class InvalidProfileLinkError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = "InvalidProfileLinkError";
        this.code = "INVALID_PROFILE_LINK";
    };
};

module.exports = InvalidProfileLinkError;