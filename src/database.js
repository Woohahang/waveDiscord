const mongoose = require('mongoose');
const { mongoURI } = require('../../config.json');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // 다른 옵션들 추가 가능
        });
        console.log("MongoDB에 연결되었습니다.");
    } catch (error) {
        console.error("MongoDB 연결 오류:", error);
    }
};

module.exports = connectToDatabase;