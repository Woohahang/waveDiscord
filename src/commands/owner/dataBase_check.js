// commands/owner/dataBase_check.js

const { SlashCommandBuilder } = require("discord.js");
const userSchema = require('../../models/userSchema.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('db_check')
        .setDescription('데이터베이스의 모든 데이터를 조회합니다.'),

    async execute(interaction) {

        if (interaction.guild.ownerId !== interaction.user.id) {
            return await interaction.reply({
                content: "이 명령어는 서버 소유자만 사용할 수 있습니다.",
                ephemeral: true // 해당 메시지를 사용자에게만 표시합니다.
            });
        }

        try {
            // 모든 데이터 조회
            const result = await userSchema.find({});
            console.log(result); // 조회된 모든 문서 출력
            console.log("조회 완료");
            await interaction.reply("모든 데이터를 조회했습니다."); // 성공 메시지 전송
        } catch (error) {
            console.error("데이터를 조회하는 중 오류 발생:", error);
            await interaction.reply("데이터 조회 중 오류가 발생했습니다."); // 오류 메시지 전송
        }
    },
};