class InvalidRiotTagFormatError extends Error {
    constructor() {
        super('Invalid Riot tag format');
        this.code = 'INVALID_RIOT_TAG_FORMAT';
        this.name = 'InvalidRiotTagFormatError';
    }
}

module.exports = InvalidRiotTagFormatError;