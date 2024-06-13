// resetMenuSelection.js

/* 메뉴 리셋하기 */
async function resetMenuSelection(interaction) {
    try {
        // 상호 작용 받은 메세지를 가지고 옵니다.
        const message = await interaction.message.fetch();

        // 메세지의 컴포넌트들 -> ex) 메인 채널은 채팅 하나에 [메뉴 버튼] 한 개, 관리자 채널은 [메뉴버튼], [업데이트, 문의하기] 두 개 이렇게 묶여있다. 
        const actionRows = message.components.map(actionRow => {
            return actionRow; // 아무런 조정을 하지 않고 새 것을 그대로 반환
        });

        // 상호 작용 받은 메세지의 components 를 다시 조정 -> 의도 : 선택 한 값에서 다시 초기 값으로 돌리는 역할을 한다.
        await message.edit({ components: actionRows });
    } catch (error) {
        throw error;
        // console.error('resetMenuSelection.js 예외 : ', error);
    };
};

module.exports = resetMenuSelection;