(function () {
    'use strict'; retryWhileError(function () {
        /* Смешав 30 -процентный и 60 -процентный растворы '+mixin.re+' и добавив 10 кг чистой воды, получили 36 -процентный раствор '+mixin.re+'. Если бы вместо 10 кг воды добавили 10 кг 50 -процентного раствора той же '+mixin.re+', то получили бы 41 -процентный раствор '+mixin.re+'. Сколько килограммов 30 -процентного раствора использовали для получения смеси? */
        let key = '99577';
        let preference = ['first_mass', 'second_mass', 'mass_of_mixin_in_first', 'mass_of_mixin_in_second'];
        
        let rand = getSelectedPreferenceFromList(key, preference);

        let firstProcent = sl(1, 60);
        let firstMass = slKrome(firstProcent, 60);

        let secondProcent = slKrome(firstProcent, 1, 60);
        let secondMass = slKrome([firstProcent, secondProcent], 60);

        let waterMass = sl(1, 50);
        let firstFinalProcent = (firstProcent * firstMass + secondProcent * secondMass) / (firstMass + secondMass + waterMass);

        genAssertZ1000(firstFinalProcent);

        let mixinMass = sl(1, 50);
        let mixinProcent = slKrome([firstProcent, secondProcent], 1, 50);

        let secondFinalProcent = (firstProcent * firstMass + secondProcent * secondMass + mixinProcent * mixinMass) / (firstMass + secondMass + mixinMass);
        genAssertZ1000(secondFinalProcent);

        let mixin = sklonlxkand(om.substance.iz());

        NAtask.setTask({
            text:
                'Смешав ' + firstProcent + '-процентный и ' + secondProcent + '-процентный растворы ' + mixin.re + ' и добавив ' + waterMass + ' кг чистой воды, ' +
                'получили ' + firstFinalProcent + '-процентный раствор ' + mixin.re + '. ' +
                'Если бы вместо ' + waterMass + ' кг воды добавили ' + mixinMass + ' кг ' + mixinProcent + '-процентного раствора той же ' + mixin.re + ', ' +
                'то получили бы ' + secondFinalProcent + '-процентный раствор ' + mixin.re + '. ',

            questions: [[{
                text: 'Сколько килограммов ' + firstProcent + '-процентного раствора использовали для получения смеси',
                answers: firstMass,
            }, {
                text: 'Сколько килограммов ' + secondProcent + '-процентного раствора использовали для получения смеси',
                answers: secondMass,
            }, {
                text: 'Сколько килограммов ' + mixin.re + ' было в ' + firstProcent + '-процентном растворе',
                answers: firstMass * firstProcent / 100,
            }, {
                text: 'Сколько килограммов ' + mixin.re + ' было в ' + secondProcent + '-процентном растворе',
                answers: secondMass * secondProcent / 100,
            },
            ][rand]],
            postquestion: '?',
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.allDecimalsToStandard(/*true*/);
    }, 2000);
})();
// РешуЕГЭ: 
// https://mathb-ege.sdamgia.ru/problem?id=99577
