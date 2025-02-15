(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let post = ['председателя', 'заместителя председателя', 'секретаря', 'президента', 'заместителя президента'].iz();

        let educationPlace = ['школьного', 'университетского'].iz();

        let clubName = ['Любители сериалов', 'Тарологи', 'Шамбала', 'Адская кухня', 'Астрономы', 'Настольщики',
            'Исповедь сценариста', 'СПГС', 'Спортивный центр', 'Юный физик', 'Шабаш тимлида', 'Фото-охота', 'Бета-тестеры', 'Любители чтения', 'Музыкант', 'Юный химик', 'Во все тяжкие'].iz();

        let rand = sl1();
        let randPartOf100 = sl(0, 5);

        let winOrLose = ['победитель', 'проигравший'][rand];
        let ratio = [100, 50, 25, 20, 10, 5][randPartOf100];
        let winnerRatio = sl((ratio / 2).ceil(), ratio - 1, 1);
        let loserRatio = ratio - winnerRatio;

        genAssertIrreducible(winnerRatio, loserRatio, 'части отношения у победителя и проигравшего имеют общие множители по мимо 1');

        let percent = (([winnerRatio, loserRatio][rand] / (loserRatio + winnerRatio)) * 100).ts();

        NAtask.setTask({
            text:
                'В выборах на пост ' + post + ' ' + educationPlace + ' клуба "' + clubName + '" претендовали два кандидата. ' +
                'Голоса избирателей распредилилсь между ними в отношении ' + '$' +
                loserRatio + ':' + winnerRatio + '$' + '. Сколько голосов получил ' + winOrLose + ' в процентах?',

            answers: percent,
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/problem?id=506569
//zer00player
