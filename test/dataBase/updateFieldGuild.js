// updateFieldGuild.js

const mongoose = require('mongoose');
const guildSettingsSchema = require('./mongoDB/guildSettingsSchema'); // 경로를 실제 파일 경로로 수정하세요
const { mongoURI } = require('../../config.json');

async function updateFieldGuild() {
    try {
        // MongoDB에 연결
        await mongoose.connect(mongoURI);

        // 모든 문서에서 kakao 필드를 kakaoBattleground 변경
        await guildSettingsSchema.updateMany({}, {
            $rename: {
                'loL': 'leagueOfLegends',
                'tfT': 'teamfightTactics',
                'steamBG': 'steamBattleGround',
                'kakaoBG': 'kakaoBattleGround'
            }
        });
        console.log('필드 이름 변경 완료');


        // 필드 삭제 (스키마에서 해당하는 필드를 주석처리 하고 실행할 것)
        // await guildSettingsSchema.updateMany({}, {
        //     $unset: {
        //         'loL': '',
        //         'tfT': '',
        //         'steamBG': '',
        //         'kakao': ''
        //     }
        // });

        // console.log('필드 이름 삭제 완료');



        // 모든 문서를 조회하여 콘솔에 출력
        const allDocuments = await guildSettingsSchema.find({});
        console.log('모든 문서:', allDocuments);


    } catch (error) {
        console.error('필드 이름 변경 중 에러 발생:', error);

    } finally {
        mongoose.connection.close();
    };
};

updateFieldGuild();