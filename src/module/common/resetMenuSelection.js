/* 메뉴 리셋하기 */
async function resetMenuSelection(interaction) {
    try {
        // 상호 작용 받은 메시지를 가져옵니다.
        const message = interaction.message;

        // 메시지의 컴포넌트들을 가져옵니다.
        // 메인 채널은 채팅 하나에 [메뉴 버튼] 한 개, 관리자 채널은 [메뉴 버튼], [업데이트, 문의하기] 두 개 이렇게 묶여있습니다.
        const actionRows = message.components;

        // 상호 작용 받은 메시지의 컴포넌트들을 다시 설정합니다.
        // 의도 : 선택한 값을 초기 값으로 되돌리는 역할을 합니다.
        await message.edit({ components: actionRows });
    } catch (error) {
        throw error;
    };
};

module.exports = resetMenuSelection;