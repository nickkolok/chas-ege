(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);


        let prise = sl(3, 100, 1);
        let persent = sl(10, 50, 1);
        let countNotebooksBeforeDsicount = sl(10, 100, 10);
        let numberOfNotebooks = countNotebooksBeforeDsicount + sl(10, 200, 5);

        let item = sklonlxkand(['тетрадь', 'ручка', 'карандаш', 'ластик', 'скотч', 'фломастер', 'маркер', 'файл', 'папка'].iz());

        let result = numberOfNotebooks * prise - persent * 0.01 * (numberOfNotebooks * prise);

        NAtask.setTask({
            text: '',
            questions: [
                {
                    text: item.ie.toZagl() + ' стоит ' + prise + ' р. ' +
                        'Сколько рублей заплатит покупатель за ' + chislitlx(numberOfNotebooks, item) + ', ' +
                        'если при покупке больше ' + chislitlx(countNotebooksBeforeDsicount, item) + ' магазин делает скидку ' +
                        persent + '% от стоимости всей покупки',
                    answers: result,
                },
                {
                    text: item.ie.toZagl() + ' стоит ' + prise + ' р. ' +
                        'Магазин делает скидку от стоимости всей покупки, если купить больше ' + chislitlx(countNotebooksBeforeDsicount, item) +
                        '. Сколько процентов составляет скидка, если покупатель заплатил за ' + chislitlx(numberOfNotebooks, item) + ' ' + result + ' р. ',
                    answers: persent,
                },
                {
                    text: item.ie.toZagl() + ' стоит ' + prise + ' р. ' +
                        'Магазин делает скидку ' + persent + '% от стоимости всей покупки, если купить больше ' + chislitlx(countNotebooksBeforeDsicount, item) +
                        '. Покупатель заплатил за покупку ' + result + ' р. с учётом скидки. Сколько ' + item.rm +
                        ' было куплено, если известно, что условия скидки были соблюдены',
                    answers: numberOfNotebooks,
                },
                {
                    text: 'Магазин делает скидку ' + persent + '% от стоимости всей покупки, если купить больше ' + chislitlx(countNotebooksBeforeDsicount, item) +
                        '. Покупатель заплатил за покупку ' + chislitlx(numberOfNotebooks, item) + ' ' + result + ' р. Сколько стоит 1 ' + item.ie,
                    answers: prise,
                },
            ],
            postquestion: '?',
        });
        NAtask.modifiers.allDecimalsToStandard();
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=77343
//zer00player
