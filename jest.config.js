module.exports = {
    moduleNameMapper: {
        '^@constants/(.*)$': '<rootDir>/src/constants/$1',
        '^@events/(.*)$': '<rootDir>/src/events/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@services/(.*)$': '<rootDir>/src/services/$1',
        '^@shared/(.*)$': '<rootDir>/src/shared/$1',
        '^@module/(.*)$': '<rootDir>/src/module/$1',
        '^@modules/(.*)$': '<rootDir>/src/modules/$1',
        '^@handlers/(.*)$': '<rootDir>/src/handlers/$1',
        '^@repositories/(.*)$': '<rootDir>/src/repositories/$1',
        '^@dtos/(.*)$': '<rootDir>/src/dtos/$1',
    },
};