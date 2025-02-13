(function () {
    'use strict';
    retryWhileError(function () {
        /* В сосуд, содержащий 5 литров 12−процентного водного раствора некоторого вещества, добавили 7 литров воды. Сколько процентов составляет концентрация получившегося раствора? */
		let key = '99571';
        let rand = getListedPreference(key, [{
			preference: 'final_concentration',
			preferenceValue: 0,
		}, {
			preference: 'water_volume',
			preferenceValue: 1,
		}, {
			preference: 'first_concentration',
			preferenceValue: 2,
		}, {
			preference: 'first_volume',
			preferenceValue: 3,
		}], sl(0, 3));
		
        let firstVolume = sl(5, 50, 0.01);
        let waterVolume = slKrome(firstVolume, 5, 50, 0.01);
        let procent = sl(10, 80);
        let finalProcent = procent * firstVolume / (firstVolume + waterVolume);

        let dano = [chislitlx(firstVolume, 'литр', 'v'), procent + '−процентного'];

        switch (rand) {
            case 0:
            case 1:
                dano = dano.join(' ');
                break;
            case 2:
                dano = dano[0];
                break;
            case 3:
                dano = 'несколько литров ' + dano[1];
                break;
        }

        genAssertZ1000(finalProcent, 'Концентрация получившегося раствора слишком дробная');

        NAtask.setTask({
            text: 'В сосуд, содержащий ' + dano + ' водного раствора некоторого вещества, ' +
                'добавили ' + [chislitlx(waterVolume, 'литр', 'v'), 'несколько литров'][Number(rand == 1)] +
                ' воды' + [' так, что получился ' + finalProcent + '−процентный раствор', ''][Number(rand == 0)] + '. ',
            questions: [[{
                text: 'Сколько процентов составляет концентрация получившегося раствора',
                answers: finalProcent,
            }, {
                text: 'Сколько литров воды добавили в раствор',
                answers: waterVolume,
            }, {
                text: 'Сколько процентов составляла концентрация изначального раствора',
                answers: procent,
            }, {
                text: 'Сколько было литров изначального раствора',
                answers: firstVolume,
            }
            ][rand]],
            postquestion: '?',
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.allDecimalsToStandard( /*true*/);
    }, 2000);
})();
// РешуЕГЭ: 
// https://mathb-ege.sdamgia.ru/problem?id=99571
