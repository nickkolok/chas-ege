(function () {
    'use strict';
    retryWhileError(function () {
        /* Смешали некоторое количество 15−процентного раствора некоторого вещества с таким же количеством 19−процентного раствора этого вещества. Сколько процентов составляет концентрация получившегося раствора? */
        let key = '99572';
        let preference = ['final_concentration', 'first_concentration'];
        let rand = getSelectedPreferenceFromList(key, preference);

        let firstProcent = sl(10, 90);
        let secondProcent = slKrome(firstProcent, 10, 90);
        let finalProcent = 0.5 * (firstProcent + secondProcent);

        let t = [firstProcent + '−процентного', secondProcent + '−процентного'];
        let randSub = sl1();
        let substance = [sklonlxkand(om.substance.iz()).re, 'вещества'][randSub];

        if (rand) {
            t = t.reverse();
            t[1] = '';
        }

        NAtask.setTask({
            text: 'Смешали некоторое количество ' + t[0] + ' раствора '+'некоторого'.esli(randSub)+' '+substance+' с таким же количеством ' + t[1] +
                ' раствора '+'этого'.esli(randSub)+' '+substance + (' другой концентрации. Получился ' + finalProcent + '-процентный раствор').esli(rand) + '. ' +
                ['Сколько процентов составляет концентрация получившегося',
                    'С раствором какой концентрации смешали ' + t[0].replace('ого', 'ый')][rand] +
                ' раствор' + 'а'.esli(!rand) + '?',
            answers: [finalProcent, firstProcent][rand],
            authors: ['Александра Суматохина'],
            preference: preference,
        });
        NAtask.modifiers.allDecimalsToStandard( /*true*/);
    }, 2000);
})();
// РешуЕГЭ: 
// https://mathb-ege.sdamgia.ru/problem?id=99572
