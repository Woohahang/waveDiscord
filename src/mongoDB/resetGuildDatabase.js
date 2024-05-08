const guildSettingsSchema = require('../mongoDB/guildSettingsSchema.js');

async function resetGuildDatabase(guild) {
    try {
        // 해당 길드 ID를 찾아서 삭제 // 지정된 조건에 맞는 문서가 없다면 아무런 문서도 삭제되지 않으며 특별한 오류도 발생하지 않는다.
        await guildSettingsSchema.findOneAndDelete({ guildId: guild.id });
        console.log(`${guild.id} 데이터베이스에서 삭제됨.`);

        // 새로운 길드 ID를 저장
        const guildSettingsData = new guildSettingsSchema({ guildId: guild.id });
        await guildSettingsData.save();

        // console.log(`${guild.id} 데이터베이스에 추가됨.`);

    } catch (error) {
        console.error('길드 데이터베이스 리셋 중 오류 발생:', error);
    }
}

module.exports = resetGuildDatabase;