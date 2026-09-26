(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '511921';

        let intDim = sl(3, 8);
        let decDim = sl(21, 49) / 10;

        let W = Math.min(intDim, decDim);
        let L = Math.max(intDim, decDim);
        let S_actual = W * L;

        let delta = sl(1, 9) / 10;
        let sign = [1, -1].iz();
        delta *= sign;

        let S_plan = Math.round((S_actual + delta) * 10) / 10;
        let diff = Math.abs(delta);

        let nouns = [
            ['комната', 'комнаты'],
            ['кухня', 'кухни'],
            ['спальня', 'спальни']
        ];
        let chosen = nouns.iz();
        let nom = chosen[0];
        let gen = chosen[1];

        let text = 'На плане указано, что прямоугольная ' + nom + ' имеет площадь $' + S_plan + '$ кв. м. ' +
                   'Точные измерения показали, что ширина ' + gen + ' равна $' + W + '$ м, а длина $' + L + '$ м. ' +
                   'На сколько квадратных метров площадь ' + gen + ' отличается от площади, указанной на плане?';

        NAtask.setTask({
            text: text,
            answers: diff,
        });

        NAtask.modifiers.allDecimalsToStandard();
    }, 20000);
})();
