// menuSelectionResetter.js

/* 셀렉트 메뉴 초기화 */
async function menuSelectionResetter(interaction) {

    try {
        // 상호작용이 발생한 채널
        const channel = interaction.channel;

        // 해당 채널의 메시지 배열로 가지고 오기
        const messages = await channel.messages.fetch({ limit: 10 });

        for (const message of messages.values()) { // messages는 Map이거나 Collection일 수 있으므로, .values()를 사용하여 반복
            // 컴포넌트가 있는 메시지만 가지고 온다.
            if (message.components.length > 0) {
                let filed = [];
                for (let i = 0; i < message.components.length; i++) {
                    filed.push(message.components[i]);
                };
                await message.edit({ components: filed }); // 각 메시지를 순차적으로 처리
            };
        };

    } catch (error) {
        console.error(`메뉴 선택 리셋 중 오류 발생: ${error}`);
    };

};

module.exports = { menuSelectionResetter };

/*
forEach 대신 for of 를 사용한 이유

-   forEach
    await 을 쓰더라도 비동기 작업의 완료를 기다리지 않는다.
    작업이 병렬로 실행 되기 때문 수정 될 때 마다 순서가 뒤죽 박죽이 될 수 있다.

-   for of
    각 메시지에 대해 비동기 작업을 순차적으로 실행한다.
    실행 순서를 정확히 제어 하기 때문 위 코드에서 for of 를 사용한다.

*/