(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let rand = sl1();
        let priseExpensive = sl(800, 3000, 10);
        let priseCheap = sl(100, 700, 10);
        let prise = [priseExpensive, priseCheap][rand];
        let percent = sl(10, 40, 1);
        let itemCheap = sklonlxkand(['словарь', 'открытка', 'календарь'].iz());
        let itemExpensive = sklonlxkand(['дневник', 'журнал', 'книга'].iz());
        let item = [itemExpensive, itemCheap][rand];

        let result = prise * (1 - percent * 0.01);

        NAtask.setTask({
            text: 'Держатели дисконтной карты книжного магазина получают при покупке скидку',
            questions: [
                {
                    text: ' ' + percent + '%. ' + item.ie.toZagl() + ' стоит ' + prise + ' р. Сколько рублей заплатит держатель дисконтной карты за ' + item.ve,
                    answers: result,
                },
                {
                    text: '. ' + item.ie.toZagl() + ' стоит ' + prise + ' р. Держатель дисконтной карты заплатил за ' + item.ve + ' ' + result + ' р. ' +
                        'Сколько процентов составляет скидка',
                    answers: percent,
                },
                {
                    text: ' ' + percent + '%. Держатель дисконтной карты заплатил за ' + item.ve + ' ' + result + ' р. ' +
                        'Сколько стоит ' + item.ie,
                    answers: prise,
                },
            ],
            postquestion: '?',
        });
        NAtask.modifiers.allDecimalsToStandard();
    }, 100);
})();
//https://mathb-ege.sdamgia.ru/test?likes=77365
//zer00player
