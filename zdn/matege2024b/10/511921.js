(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        
        let width = sl(2, 12, 0.1);
        let length = sl(2, 9);
        let S = length * width;
        let delta = sl(0.1, 3, 0.1);
        let newS = Math.round((S + delta) * 10) / 10;
   
        NAtask.setTask({
            text: 'На плане указано, что прямоугольная комната имеет площадь $' + newS + '$ кв. м. Точные измерения показали, что ширина комнаты равна $' + width + '$ м, а длина $' + length +
            '$ м. На сколько квадратных метров площадь комнаты отличается от площади, указанной на плане?',
            answers: delta,
        });
        NAtask.modifiers.allDecimalsToStandard();
    }, 20000);
})();
//https://ege.sdamgia.ru/test?likes=511921
