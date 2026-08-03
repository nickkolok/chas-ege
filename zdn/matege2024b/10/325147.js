(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '325147';
        let preference = ['tile', 'parquet'];
        let rand = getSelectedPreferenceFromList(key, preference);

        let aSideFloor = sl(2, 9, 1) + [0, sl(0.1, 0.9, 0.1)][rand];
        let bSideFloor = slKrome([aSideFloor], 2, 9, 1) + [0, sl(0.1, 0.9, 0.1)][rand];
        genAssert(aSideFloor != bSideFloor, 'не должны совпадать две стороны');
        let aSidePart = sl(10, 30, 5);
        let bSidePart = slKrome([aSidePart], 10, 30, 5);

        let result = (aSideFloor * bSideFloor) / (aSidePart * [bSidePart, aSidePart][rand] * 0.0001);
        genAssert(result.isZ(), 'результат не целый');

        NAtask.setTask({
            text: ['Пол комнаты, имеющей форму прямоугольника со сторонами $' + aSideFloor + '$ м и $' + bSideFloor + '$ м,' +
                ' требуется покрыть паркетом из прямоугольных дощечек со сторонами $' + aSidePart + '$ см и $' + bSidePart + '$ см.' +
                ' Сколько потребуется таких дощечек?',
            'Сколько потребуется кафельных плиток квадратной формы со стороной $' + aSidePart + '$ см,' +
            ' чтобы облицевать ими стену, имеющую форму прямоугольника со сторонами $' + aSideFloor + '$ м и $' + bSideFloor + '$ м?'][rand],
            answers: result,
            preference: preference,
        });
        NAtask.modifiers.allDecimalsToStandard();
    }, 20000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=325147
