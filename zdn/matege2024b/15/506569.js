(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let post = ['председателя', 'заместителя председателя', 'секретаря', 'президента', 'заместителя президента'].iz();

        let educationPlace = ['школьного', 'университетского'].iz();

        let clubName = ['Любители сериалов', 'Тарологи', 'Шамбала', 'Адская кухня', 'Астрономы', 'Настольщики',
            'Исповедь сценариста', 'СПГС', 'Спортивный центр', 'Юный физик', 'Шабаш тимлида', 'Фото-охота', 'Бета-тестеры', 'Любители чтения', 'Музыкант', 'Юный химик', 'Во все тяжкие'].iz();

        let rand = sl(0, 1);
        let randUpgrade = sl(0, 1);
        let randPartOf100 = sl(0, 5);

        let winOrLose = ['победитель', 'проигравший'][rand];
        let loserRatio = [100 - sl(51, 99, 1), 50 - sl(26, 49, 1), 25 - sl(13, 24, 1), 20 - sl(11, 19, 1), 10 - sl(6, 9, 1), 5 - sl(3, 4, 1)][randPartOf100];
        let winnerRatio = [100 - loserRatio, 50 - loserRatio, 25 - loserRatio, 20 - loserRatio, 10 - loserRatio, 5 - loserRatio][randPartOf100];

        genAssertIrreducible(winnerRatio, loserRatio, 'части отношения у победителя и проигравшего имеют общие множители по мимо 1');

        let percent = (([winnerRatio, loserRatio][rand] / (loserRatio + winnerRatio)) * 100).ceil();

        NAtask.setTask({
            text:
                'В выборах на пост ' + post + ' ' + educationPlace + ' клуба "' + clubName + '" претендовали два кандидата. ' + ['Голоса избирателей распредилилсь между ними в отношении ' +
                    + loserRatio + ':' + winnerRatio + '. Сколько голосов получил ' + winOrLose + ' в процентах?',
                winOrLose.toZagl() + ' набрал ' + percent + '% голосов. Какое соотношение голосов проигравшего к голосам победителя?'][randUpgrade],
            answers: [percent, loserRatio + ':' + winnerRatio][randUpgrade],
        });
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/problem?id=506569
//zer00player
