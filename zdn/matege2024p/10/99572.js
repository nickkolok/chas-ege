(function () {
    'use strict';
    retryWhileError(function () {
        /* Смешали некоторое количество 15−процентного раствора некоторого вещества с таким же количеством 19−процентного раствора этого вещества. Сколько процентов составляет концентрация получившегося раствора? */
		let key = '99572';
        let rand = getListedPreference(key, [{
			preference: 'final_concentration',
			preferenceValue: 0,
		}, {
			preference: 'first_concentration',
			preferenceValue: 1,
		}], sl1());

        let firstProcent = sl(10, 90);
        let secondProcent = slKrome(firstProcent, 10, 90);
        let finalProcent = 0.5 * (firstProcent + secondProcent);

        let t = [firstProcent + '−процентного', secondProcent + '−процентного'];

        if (rand) {
            t = t.randomReverse();
            t[1] = '';
        }

        NAtask.setTask({
            text: 'Смешали некоторое количество ' + t[0] + ' раствора некоторого вещества с таким же количеством ' + t[1] +
                ' раствора этого вещества' + (' другой концентрации. Получился ' + finalProcent + '-процентный раствор').esli(rand) + '. ' +
                ['Сколько процентов составляет концентрация получившегося',
                    'С раствором какой концентрации смешали ' + t[0].replace('ого', 'ый')][rand] +
                ' раствор' + 'а'.esli(!rand) + '?',
            answers: [finalProcent, firstProcent][rand],
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.allDecimalsToStandard( /*true*/);
    }, 2000);
})();
// РешуЕГЭ: 
// https://mathb-ege.sdamgia.ru/problem?id=99572
