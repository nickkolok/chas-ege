(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);


        let prise = sl(100, 3000, 10);
        let percent = sl(10, 50, 1);
        let item = sklonlxkand(['словарь', 'дневник', 'журнал', 'открытка', 'календарь', 'книга'].iz());

        let result = prise - percent * 0.01 * prise;

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
