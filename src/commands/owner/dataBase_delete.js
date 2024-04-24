// commands/owner/dataBase_delete.js

const { SlashCommandBuilder } = require("discord.js");
const userSchema = require('../../models/userSchema.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('db_delete')
        .setDescription('데이터베이스의 모든 데이터를 삭제합니다.'),

    async execute(interaction) {
        const serverOwnerId = interaction.guild.ownerId;
        const userIsServerOwner = interaction.user.id === serverOwnerId;

        if (!userIsServerOwner) {
            return await interaction.reply({
                content: "이 명령어는 서버 소유자만 사용할 수 있습니다.",
                ephemeral: true // 해당 메시지를 사용자에게만 표시합니다.
            });
        }

        try {
            // userSchema 모델에 연결된 컬렉션에서 모든 문서 삭제
            await userSchema.deleteMany({});
            console.log('모든 데이터가 삭제되었습니다.');
            await interaction.reply('데이터베이스의 모든 데이터가 삭제되었습니다.');
        } catch (error) {
            console.error('데이터 삭제 중 오류 발생:', error);
            await interaction.reply('데이터 삭제 중 오류가 발생했습니다.');
        }
    },
};
