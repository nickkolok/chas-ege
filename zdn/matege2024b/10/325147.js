(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        'use strict';
        window.nabor.preferences['325147'] = ['parquet'];
        let key = '325147';
        let preference = ['tile', 'parquet'];
        let rand = getSelectedPreferenceFromList(key, preference);

        let aSideFloor = sl(2, 9, 1);
        let bSideFloor = slKrome([aSideFloor], 2, 9, 1);
        let AparquetMultiplier = sl(0.1, 0.9, 0.01);
        let BparquetMultiplier = slKrome([AparquetMultiplier],0.1, 0.9, 0.01);

        let aSidePart = sl(10, 30, 5);
        let bSidePart = slKrome([aSidePart], 10, 30, 5);

        let result = (aSideFloor * bSideFloor * [1, AparquetMultiplier * BparquetMultiplier][rand]) / (aSidePart * [bSidePart, aSidePart][rand] * 0.0001);
        genAssert(result.isZ(), 'результат не целый');

        NAtask.setTask({
            text: ['Пол комнаты, имеющей форму прямоугольника со сторонами $' + aSideFloor + '$ м и $' + bSideFloor + '$ м,' +
                ' требуется покрыть паркетом из прямоугольных дощечек со сторонами $' + aSidePart + '$ см и $' + bSidePart + '$ см.' +
                ' Сколько потребуется таких дощечек?',
            'Сколько потребуется кафельных плиток квадратной формы со стороной $' + aSidePart + '$ см,' +
            ' чтобы облицевать ими стену, имеющую форму прямоугольника со сторонами $' + aSideFloor * AparquetMultiplier + '$ м и $' + bSideFloor * BparquetMultiplier + '$ м?'][rand],
            answers: result,
            preference: preference,
        });
        NAtask.modifiers.allDecimalsToStandard();
    }, 20000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=325147
