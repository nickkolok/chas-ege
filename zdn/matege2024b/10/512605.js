(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '512605';

        let kmPerCm = sl(1, 20, 0.5);
        let cmOnMap = sl(2, 12, 1);
        
        let result = kmPerCm * cmOnMap;
        genAssert(result.isZ(), 'результат должен быть целым');

        NAtask.setTask({
            text: 'Масштаб карты такой, что в одном сантиметре $' + kmPerCm + '$ км. Чему равно расстояние между городами A и B (в км), если на карте оно составляет $' + cmOnMap + '$ см?',
            answers: result,
        });
        NAtask.modifiers.allDecimalsToStandard();
    }, 20000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=512605
