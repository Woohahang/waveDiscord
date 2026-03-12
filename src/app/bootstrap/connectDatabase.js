require('dotenv').config();
const mongoose = require("mongoose")
const logger = require('@utils/logger');

async function connectDatabase() {

    const uri = process.env.MONGODB_URI

    if (!uri) {
        throw new Error("[connectDatabase] MONGO_URI is not defined");
    }

    await mongoose.connect(uri);

    logger.info("[connectDatabase] MongoDB connected");
}

module.exports = connectDatabase;