(function () {
    'use strict';
    retryWhileError(function () {
        /* Смешали некоторое количество 15−процентного раствора некоторого вещества с таким же количеством 19−процентного раствора этого вещества. Сколько процентов составляет концентрация получившегося раствора? */

        let firstProcent = sl(10, 90);
        let secondProcent = slKrome(firstProcent, 10, 90);
        let finalProcent = 0.5 * (firstProcent + secondProcent);

        let rand = sl1();

        let t = [firstProcent + '−процентного', secondProcent + '−процентного'];

        if (rand) {
            t = t.randomReverse();
            t[0] = '';
            t = t.shuffle();
        }

        NAtask.setTask({
            text: 'Смешали некоторое количество ' + t[0] + ' раствора некоторого вещества с таким же количеством ' + t[1] +
                ' раствора этого вещества. ' + ('Получился ' + finalProcent + '-процентрый раствор. ').esli(rand) + [
                    'Сколько процентов составляет концентрация получившегося',
                    'Какая концентрация была у ' + ['первого', 'второго'][Number(t[1] == '')]
                ][rand] + ' раствора?',
            answers: [finalProcent, [firstProcent, secondProcent][Number(t[0] == '')]][rand],
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.allDecimalsToStandard( /*true*/);
    }, 2000);
})();
// РешуЕГЭ: 
// https://mathb-ege.sdamgia.ru/problem?id=99572
