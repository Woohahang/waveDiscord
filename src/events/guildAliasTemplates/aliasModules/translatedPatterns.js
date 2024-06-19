const { getState } = require('../aliasModules/state');
const patternKoreanMap = require('./patternKoreanMap');

function translatedPatterns() {
    try {
        // 상태
        const { aliasPatterns, aliasSeparator } = getState();

        if (aliasSeparator) {
            switch (aliasSeparator) {
                case 'space':
                    separator = ' ';
                    break;

                case '_':
                    separator = '\\_';
                    break;

                default:
                    separator = ',';
            };

            return aliasPatterns.map(value => patternKoreanMap[value]).join(separator);
        };

        if (aliasPatterns) {
            return aliasPatterns.map(value => patternKoreanMap[value]).join(',');
        };

    } catch (error) {
        throw error;
    };
};

module.exports = translatedPatterns;