(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '5569906';
        let preference = ['everyStudent', 'oneTypeOfStudent'];
        let rand = getSelectedPreferenceFromList(key, preference);
        let randGender = sl1();

        let genderFirst = sklonlxkand(['мальчик', 'девочка'][randGender]);
        let genderSecond = sklonlxkand(['мальчик', 'девочка'][randGender - 1]);

        let total = sl(400, 2500);
        let percent = sl(51, 70);
        let result = total * 0.01 * percent;
        genAssert(result.isAlmostInteger(), 'Учеников не может быть нецелое число');
        let minus = result - (total - result);

        NAtask.setTask({
            text: 'В школе ' + genderFirst.rm + ' составляют $' + percent + '\\%$ числа всех учащихся. Сколько в этой школе ' + ['всего учащихся', genderFirst.rm][rand] +
                ', если ' + [' в ней ', ' их '][rand] + 'на ' + chislitlx(minus, 'человек', 'r$') + ' больше, чем ' + genderSecond.rm + '?',
            answers: [total, result][rand],
            preference: preference,
        });

        NAtask.modifiers.allDecimalsToStandard()
    }, 2000);
})();
//5569906
//Открытый банк заданий 54FD72
//zer00player
