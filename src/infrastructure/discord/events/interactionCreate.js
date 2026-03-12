const buttonHandler = require('../handlers/buttonHandler');
const commandHandler = require('../handlers/commandHandler');
const modalSubmitHandler = require('../handlers/modalSubmitHandler');
const selectMenuHandler = require('../handlers/selectMenuHandler');

module.exports = (client, dependencies) => {

    client.on("interactionCreate", async interaction => {

        console.log("interaction.isChatInputCommand() :", interaction.isChatInputCommand());        // 커맨드 명령어를 사용했을 때 작동
        console.log("interaction.isStringSelectMenu() :", interaction.isStringSelectMenu());        // 메뉴를 선택했을 때 작동
        console.log("interaction.isButton() :", interaction.isButton());                            // 버튼을 눌렀을 때 작동
        console.log("interaction.isModalSubmit() :", interaction.isModalSubmit());                  // 모달을 제출했을 때 작동

        if (interaction.isChatInputCommand())
            return commandHandler(interaction, dependencies);

        if (interaction.isButton())
            return buttonHandler(interaction, dependencies);

        if (interaction.isStringSelectMenu())
            return selectMenuHandler(interaction, dependencies);

        if (interaction.isModalSubmit())
            return modalSubmitHandler(interaction, dependencies);

    });

};