const mongoose = require('mongoose');
const { mongoURI } = require('../../../config.json');
const logger = require('../utils/logger');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongoURI);
        logger.info('[database] MongoDB 연결 완료');
    } catch (error) {
        logger.error('[database] MongoDB 연결 오류', {
            errorMessage: error.message
        });
    };
};

module.exports = connectToDatabase;