const mongoose = require('mongoose');
const { mongoURI } = require('../../../config.json');
const logger = require('../utils/logger');

const connectMongoDB = async () => {
    await mongoose.connect(mongoURI);
    logger.info('[connectMongoDB] MongoDB 연결 완료');
};

module.exports = connectMongoDB;