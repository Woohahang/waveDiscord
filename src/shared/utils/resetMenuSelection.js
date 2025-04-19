/**
 * 선택 메뉴(Select Menu)의 선택값을 초기화합니다.
 * 
 * 유저가 선택한 메뉴 값을 초기 상태(미선택)로 되돌리기 위해,
 * 메시지를 다시 수정하여 기존 컴포넌트를 그대로 적용합니다.
 * 
 * @param {Interaction} interaction - Discord 상호작용 객체
 * @returns {Promise<void>} 비동기 함수이며, 반환값은 없습니다.
 */
async function resetMenuSelection(interaction) {
    try {
        const message = interaction.message;
        const actionRows = message.components;
        await message.edit({ components: actionRows });
    } catch (error) {
        throw error;
    };
};

module.exports = resetMenuSelection;