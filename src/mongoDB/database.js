const mongoose = require('mongoose');
const { mongoURI } = require('../../../config.json');
const logger = require('../utils/logger');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongoURI);
        logger.info(`[database] MongoDB에 성공적으로 연결되었습니다.`);
    } catch (error) {
        logger.error(`[database] MongoDB 연결 오류: ${error.message}`);
    };
};

module.exports = connectToDatabase;