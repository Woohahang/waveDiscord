class RemoveNicknameUseCase {

    constructor({ userRepository }) {
        this.userRepository = userRepository;
    }

    async execute({ userId, nicknamesToRemove }) {
        let user = await this.userRepository.findById(userId);

        if (!user) {
            return console.log('[RemoveNicknameUseCase] user not');
        }

        const resultKey = user.removeNicknames(nicknamesToRemove);      // 상태키 리팩터링 예정

        await this.userRepository.save(user);

        return 'NICKNAME_DELETE_SUCCESS';
    }

}

module.exports = RemoveNicknameUseCase;