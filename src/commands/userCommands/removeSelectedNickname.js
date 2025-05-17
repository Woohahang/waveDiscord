const { SlashCommandBuilder } = require('discord.js');
const deleteNicknameMenu = require('../../events/nicknameFlow/handlers/deleteNicknameMenu');

module.exports = {
    // 슬래시 명령어를 정의합니다.
    data: new SlashCommandBuilder()
        .setName('닉네임삭제')
        .setDescription('등록 된 닉네임을 삭제합니다.'),

    async execute(interaction) {
        try {
            // 닉네임 삭제를 담당하는 함수입니다.
            await deleteNicknameMenu(interaction);

        } catch (error) {
            console.error('removeSelectedNickname.js 에러 : ', error);
        };
    }
};