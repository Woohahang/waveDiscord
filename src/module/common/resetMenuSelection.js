// resetMenuSelection.js

/* 메뉴 리셋하기 */
async function resetMenuSelection(interaction) {
    // 상호 작용 받은 메세지를 가지고 옵니다.
    const message = await interaction.message.fetch();

    // 메세지의 컴포넌츠들 중에 0번째를 가지고 옵니다. (어차피 하나만 있긴 하지만 배열로 받기 때문에 [0] 을 써야 된다.)
    const actionRow = message.components[0];

    // 상호 작용 받은 메세지의 components 를 0번째 메뉴로 수정합니다.
    await message.edit({ components: [actionRow] });
};

module.exports = resetMenuSelection;