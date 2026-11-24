(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let countPillars = sl(3, 20, 1);
        let countWires = sluchch(3, 20, 1);

        genAssert((countWires * countPillars).kratno(2), "Количество соединений между столбами должно быть кратно двум ")

        NAtask.setTask({
            text: chislitlx(countPillars, 'столб', 'v$') + ' соединены между собой проводами так, ' +
                'что от каждого столба отходит ровно ' + chislitlx(countWires, 'провод', 're$') + '. ' +
                'Сколько всего проводов протянуто между этими столбами?',
            answers: (countWires * countPillars) / 2,
        });
    });
})();
//https://mathb-ege.sdamgia.ru/test?likes=512925
//zer00player
