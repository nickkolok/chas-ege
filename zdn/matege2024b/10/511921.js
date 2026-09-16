(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        
        let wInt = sl(2, 4, 1);
        let wDec = sl(1, 9, 1) / 10;
        let w = wInt + wDec;
        
        let l = slKrome([w], 4, 7, 1);
        
        let actualArea = w * l;
        let delta = sl(1, 5, 1) / 10;
        let sign = sl([1, -1]);
        let planArea = actualArea + sign * delta;
        
        let actualAreaR = Math.round(actualArea * 10) / 10;
        let planAreaR = Math.round(planArea * 10) / 10;
        
        genAssert(planAreaR > 0, 'площадь на плане должна быть положительной');
        genAssert(planAreaR !== actualAreaR, 'площадь на плане не должна совпадать с фактической');
        
        let diff = Math.round(Math.abs(actualAreaR - planAreaR) * 10) / 10;
        
        NAtask.setTask({
            text: 'На плане указано, что прямоугольная комната имеет площадь ' + planAreaR + ' кв. м. Точные измерения показали, что ширина комнаты равна ' + w + ' м, а длина ' + l + ' м. На сколько квадратных метров площадь комнаты отличается от площади, указанной на плане?',
            answers: diff,
        });
        NAtask.modifiers.allDecimalsToStandard();
    }, 20000);
})();
//https://ege.sdamgia.ru/test?likes=511921
