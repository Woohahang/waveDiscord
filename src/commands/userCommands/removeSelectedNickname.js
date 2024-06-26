const { SlashCommandBuilder } = require('discord.js');
const UserSettings = require('../../services/UserSettings');
const logUserInfo = require('../../utils/log/logUserInfo');
const createMenu = require('../../events/userNickName/deleteNickname/modules/createMenu');
const createMenuOptions = require('../../events/userNickName/deleteNickname/modules/createMenuOptions');

module.exports = {
    // 슬래시 명령어를 정의합니다.
    data: new SlashCommandBuilder()
        .setName('닉네임삭제')
        .setDescription('등록 된 닉네임을 삭제합니다.'),

    // 명령어 실행 시 호출되는 함수입니다.
    async execute(interaction) {
        try {
            const userId = interaction.member.id;

            // 유저 인스턴스 생성 및 유저 데이터를 불러옵니다.
            const userSettings = new UserSettings(userId);
            const userData = await userSettings.loadUserData();

            // 유저 데이터가 없으면 메시지를 보냅니다.
            if (!userData) {
                await interaction.reply({
                    content: '등록된 정보가 없습니다.',
                    ephemeral: true
                });

                return;
            };

            // 유저 닉네임 옵션을 생성합니다.
            const options = createMenuOptions(userData);

            // 닉네임 개수를 확인합니다.
            const namesLength = options.length;

            // 닉네임이 없으면 메시지를 보냅니다.
            if (namesLength <= 0) { return await interaction.reply({ content: '등록된 닉네임이 없습니다.', ephemeral: true }); }

            // 닉네임 선택 메뉴를 생성합니다.
            const row = createMenu(options);

            // 닉네임 선택 메뉴를 전송합니다.
            await interaction.reply({
                content: '등록 된 닉네임을 삭제합니다! 메뉴를 선택해주세요!',
                components: [row],
                ephemeral: true
            });

        } catch (error) {
            // 에러 발생 시 로그를 남기고 에러 메시지를 전송합니다.
            logUserInfo(interaction);
            console.error('removeSelectedNickname.js 에러 : ', error);
            await interaction.reply({ content: '닉네임 삭제 중 오류가 발생했습니다.', ephemeral: true });
        };
    }
};