const MongoUserRepository = require('../../infrastructure/database/mongo/repositories/mongoUserRepository');
const MongoGuildRepository = require('../../infrastructure/database/mongo/repositories/mongoGuildRepository');
const RegisterNicknameUseCase = require('../../application/nickname/usecases/registerNicknameUseCase');
const RemoveNicknameUseCase = require('../../application/nickname/usecases/removeNicknameUseCase');
const VoiceProfileService = require("../../domain/voice/services/VoiceProfileService");               // 리팩터링 예정
// const SendVoiceProfileUseCase = require("@application/voiceProfile/SendVoiceProfileUseCase");    // 리팩터링 예정

/**
 * 애플리케이션에서 사용할 의존성을 조립합니다.
 *
 * 각 계층의 구현체를 생성하고,
 * 유스케이스에 필요한 의존성을 연결한 뒤 반환합니다.
 *
 * @returns {Object} 조립된 유스케이스 목록
 */
module.exports = function createDependencies() {

    const userRepository = new MongoUserRepository();
    const guildRepository = new MongoGuildRepository();

    const registerNicknameUseCase =
        new RegisterNicknameUseCase({ userRepository })

    const removeNicknameUseCase =
        new RemoveNicknameUseCase({ userRepository })

    // const voiceProfileService =
    // new VoiceProfileService(userRepository, guildRepository)            // 리팩터링 예정
    // const sendVoiceProfileUseCase =
    // new SendVoiceProfileUseCase(voiceProfileService)             // 리팩터링 예정

    return {
        registerNicknameUseCase,
        removeNicknameUseCase,
        // sendVoiceProfileUseCase
    }

}