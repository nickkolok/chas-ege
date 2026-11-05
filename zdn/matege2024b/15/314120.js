(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = '314120';
        let preference = ['discount', 'markup', 'assembly'];
        let variant = getSelectedPreferenceFromList(key, preference);
        if (variant !== 0) {
            let percent = variant === 1 ? sl(5, 35, 5) : sl(5, 30, 5);
            let price = variant === 1 ? sl(10, 40) * 10 : sl(20, 150) * 100;
            let count = variant === 1 ? sl(2, 8) : 1;
            let text = variant === 1 ?
                'Магазин детских товаров закупает погремушки по оптовой цене $' + price +
                '$ рублей за штуку и продаёт их с наценкой $' + percent + '$%. Сколько рублей будут стоить ' +
                chislitlx(count, 'погремушка', '$') + ' в этом магазине?' :
                'В магазине мебель продаётся в разобранном виде. Сборка на дому стоит $' + percent +
                '$% от стоимости мебели. Шкаф стоит $' + price + '$ рублей. Сколько рублей стоит шкаф вместе со сборкой?';
            NAtask.setTask({
                text,
                answers: count * price * (100 + percent) / 100,
                preference,
            });
            NAtask.modifiers.allDecimalsToStandard();
            return;
        }
        let item = sklonlxkand((om.meltov.ie).iz());
        let prise = sl(200, 1000, 10);
        let payment = sl(10, 5000, 5) + prise * 2;
        let percent = sl(3, 80);
        let count = sl(2, 20);
        let priceInKopecks = prise * (100 - percent);

        NAtask.setTask({
            text: 'Набор ' + item.rm + ', который стоил ' + '$' + prise + '$' +
                ' рублей, продаётся со скидкой ' + '$' + percent + '$' + '%. ',
            questions: [
                {
                    text:
                        'Какое наибольшее число наборов ' + item.rm + ' можно купить за ' + '$' + payment + '$' + ' рублей',
                    answers: Math.floor(100 * payment / priceInKopecks),
                },
                {
                    text: 'Сколько рублей будут стоить ' + '$' + count + '$' + ' наборов ' + item.rm + ', купленных в этом магазине',
                    answers: priceInKopecks * count / 100,
                }
            ], postquestion: '?',
            preference,
        }); NAtask.modifiers.allDecimalsToStandard();
    }, 100);
})();
//zer00player
//https://math-oge.sdamgia.ru/test?likes=314120
// 3D7646, AC7A1B, 753921, 0654C3, DCD0CF, A3D55E, A5C5CB, 40FA38, 58593E, 876A33, A61980, 56D958, 411AF2, FEB82E, CC63D0, E084D7, F6AB99, A4B8E6, 96F362, 209AA5, 7FC870, D68936, 27CABC, C94D41, 905FF7, 331B7C, 3DA273, 0AF6BB, B1779F, 3DF9E2
