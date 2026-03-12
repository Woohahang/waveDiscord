const MongoUserRepository = require('../../infrastructure/database/mongo/repositories/mongoUserRepository');
const MongoGuildRepository = require('../../infrastructure/database/mongo/repositories/mongoGuildRepository');
const RegisterNicknameUseCase = require('../../application/nickname/usecases/RegisterNicknameUseCase');
const VoiceProfileService = require("../../domain/voice/services/VoiceProfileService");               // 리팩터링 예정
// const SendVoiceProfileUseCase = require("@application/voiceProfile/SendVoiceProfileUseCase");    // 리팩터링 예정

/**
 * 객체 조립소
 * 각 계층의 클래스들을 직접 여기서 연결해서 **“실제로 실행 가능한 객체 그래프”**를 만드는 코드
*/
module.exports = function createDependencies() {

    const userRepository = new MongoUserRepository();
    const guildRepository = new MongoGuildRepository();

    const registerNicknameUseCase =
        new RegisterNicknameUseCase({ userRepository })

    // const voiceProfileService =
    // new VoiceProfileService(userRepository, guildRepository)            // 리팩터링 예정
    // const sendVoiceProfileUseCase =
    // new SendVoiceProfileUseCase(voiceProfileService)             // 리팩터링 예정

    return {
        registerNicknameUseCase,
        // sendVoiceProfileUseCase
    }

}