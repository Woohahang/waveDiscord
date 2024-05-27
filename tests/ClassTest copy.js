// ClassTest.js

class ClassTest {
    constructor(userId) {

        if (typeof userId !== 'string' || userId.trim() === '') {
            throw new Error('유효하지 않은 userId입니다.');
        }

        // 싱글톤 패턴
        if (!ClassTest.instances[userId]) {
            this.userId = userId;
            this.userData = null;
            ClassTest.instances[userId] = this;
            // 타이머 설정
            this.#resetTimer(userId);
        } else {
            // 이미 인스턴스가 존재한다면 타이머만 리셋
            ClassTest.instances[userId].#resetTimer(userId);
        }
        return ClassTest.instances[userId];
    }

    #resetTimer(userId) {
        // 기존 타이머가 있다면 취소
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        // 새 타이머 설정
        this.timeout = setTimeout(() => {
            // 타이머가 완료되면 인스턴스 삭제
            delete ClassTest.instances[userId];
        }, 60000); // 1분 후
    }

}

ClassTest.instances = {};

module.exports = ClassTest;

/*
현재 코드는 userId 기준으로 단 하나의 인스턴스만 생성한다.
또한, 이 인스턴스는 동작이 없으면 1분 뒤 삭제 된다.

왜 만들었는가?
닉네임을 두 번 이상 저장할 때
두 번째 닉네임 저장에서 데이터베이스의 상호작용을 줄이기 위해
즉, 속도를 더욱 빠르게 하기 위해 신경 썼다.

*/


/*
 if (!ClassTest.instances[userId]) { } : 싱글톤 패턴

 싱글톤 패턴이 중요한 이유

1. 싱글톤 패턴을 쓰지 않는다?
 ClassTest.instances 의 배열 안에 userId 를 키 값으로 지정한 한 개의 객체만 저장 되겠지만!!!!!!!!
 이 ClassTest 객체를 생성할 때 new 연산자를 쓸 것 아닌가?
 new ClassTest 를 두 번, 세 번 호출 할 때 마다 메모리에 두 개, 세 개 저장 된다!!!!
 그래서 나중에 메모리 터진다!!!!!!

즉 뭔말이냐? 싱글톤 패턴을 적용하면 new 연산자를 백반 오천번 써도 메모리 한 개만 쓴다

*/