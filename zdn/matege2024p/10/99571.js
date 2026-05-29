(function () {
    'use strict';
    retryWhileError(function () {
        /* В сосуд, содержащий 5 литров 12−процентного водного раствора некоторого вещества, добавили 7 литров воды. Сколько процентов составляет концентрация получившегося раствора? */
        let key = '99571';
        let preference = ['final_concentration', 'water_volume', 'first_concentration', 'first_volume'];
        let rand = getSelectedPreferenceFromList(key, preference);

        let firstVolume = sl(5, 50);
        let waterVolume = slKrome(firstVolume, 5, 50);
        let percent = sl(10, 80);
        let finalPercent = percent * firstVolume / (firstVolume + waterVolume);
        genAssertAlmostInteger(finalPercent, 'Концентрация получившегося раствора слишком дробная');

        let dano = [chislitlx(firstVolume, 'литр', 'v'), percent + '−процентного'];
        let chemicalSubstance = ['некоторого вещества', 'щелочи', 'соли', 'кислоты'].iz();

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

        NAtask.setTask({
            text: 'В сосуд, содержащий ' + dano + ' водного раствора ' + chemicalSubstance + ', ' +
                'добавили ' + [chislitlx(waterVolume, 'литр', 'v'), 'несколько литров'][Number(rand == 1)] +
                ' воды' + [' так, что получился ' + finalPercent + '−процентный раствор', ''][Number(rand == 0)] + '. ',
            questions: [[{
                text: 'Сколько процентов составляет концентрация получившегося раствора',
                answers: finalPercent,
            }, {
                text: 'Сколько литров воды добавили в раствор',
                answers: waterVolume,
            }, {
                text: 'Сколько процентов составляла концентрация изначального раствора',
                answers: percent,
            }, {
                text: 'Сколько было литров изначального раствора',
                answers: firstVolume,
            }
            ][rand]],
            postquestion: '?',
            preference: preference,
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.allDecimalsToStandard( /*true*/);
    }, 2000);
})();
// РешуЕГЭ: 
// https://mathb-ege.sdamgia.ru/problem?id=99571
