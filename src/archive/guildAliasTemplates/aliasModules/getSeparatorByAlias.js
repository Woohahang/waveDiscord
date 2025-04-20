function getSeparatorByAlias(aliasSeparator) {
    switch (aliasSeparator) {
        case 'space':
            return ' ';
        case 'slash':
            return '/';
        case 'hyphen':
            return '-';
        case 'underscore':
            return '_';
        default:
            return ' ';
    };
};

module.exports = getSeparatorByAlias;