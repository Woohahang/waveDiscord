require('dotenv').config();
const mongoose = require("mongoose")
const logger = require('@utils/logger');

async function connectDatabase() {

    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGO_DB_NAME;

    if (!uri) {
        throw new Error("[connectDatabase] MONGO_URI is not defined");
    }

    // await mongoose.connect(uri); ; 기존 코드

    await mongoose.connect(uri, {
        dbName: dbName
    });

    logger.info(`[connectDatabase] MongoDB connected (${dbName})`);
}

module.exports = connectDatabase;