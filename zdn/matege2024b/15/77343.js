(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl1();
        let priseExpensive = sl(60, 200, 1);
        let priseCheap = sl(3, 50, 1);
        let prise = [priseExpensive, priseCheap][rand];

        let itemCheap = sklonlxkand(['тетрадь', 'ручка', 'карандаш', 'ластик', 'файл'].iz());
        let itemExpensive = sklonlxkand(['скотч', 'фломастер', 'маркер', 'папка'].iz());
        let item = [itemExpensive, itemCheap][rand];

        let perсent = sl(10, 90, 1);
        let countNotebooksBeforeDsicount = sl(10, 100, 10);
        let numberOfNotebooks = countNotebooksBeforeDsicount + sl(10, 200, 5);

        let result = prise * numberOfNotebooks * (1 - perсent * 0.01);

        NAtask.setTask({
            text: '',
            questions: [
                {
                    text: item.ie.toZagl() + ' стоит ' + prise + ' р. ' +
                        'Сколько рублей заплатит покупатель за ' + chislitlx(numberOfNotebooks, item) + ', ' +
                        'если при покупке больше ' + chislitlx(countNotebooksBeforeDsicount, item) + ' магазин делает скидку ' +
                        perсent + '% от стоимости всей покупки',
                    answers: result,
                },
                {
                    text: item.ie.toZagl() + ' стоит ' + prise + ' р. ' +
                        'Магазин делает скидку от стоимости всей покупки, если купить больше ' + chislitlx(countNotebooksBeforeDsicount, item) +
                        '. Сколько процентов составляет скидка, если покупатель заплатил за ' + chislitlx(numberOfNotebooks, item) + ' ' + result + ' р. ',
                    answers: perсent,
                },
                {
                    text: item.ie.toZagl() + ' стоит ' + prise + ' р. ' +
                        'Магазин делает скидку ' + perсent + '% от стоимости всей покупки, если купить больше ' + chislitlx(countNotebooksBeforeDsicount, item) +
                        '. Покупатель заплатил за покупку ' + result + ' р. с учётом скидки. Сколько ' + item.rm +
                        ' было куплено, если известно, что условия предоставления скидки были соблюдены',
                    answers: numberOfNotebooks,
                },
                {
                    text: 'Магазин делает скидку ' + perсent + '% от стоимости всей покупки, если купить больше ' + chislitlx(countNotebooksBeforeDsicount, item) +
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
