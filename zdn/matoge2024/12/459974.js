(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = '506276';
        let preference = ['findMass', 'findHeight', 'findEnergy'];
        let rand = getSelectedPreferenceFromList(key, preference);

        let mass = sl(2, 20);
        let height = sl(1, 10);
        let energy = mass * 9.8 * height;

        let the_orderToFind = decor.orderToFind.iz();

        NAtask.setTask({
            text:
                'Если тело массой $m$ кг подвешено на высоте $h$ м над горизонтальной поверхностью земли, ' +
                'то его потенциальная энергия в джоулях вычисляется по формуле $P = mgh$, $g=9{,}8$ м/с$^2$ – ускорение свободного падения. ' +
                the_orderToFind.toZagl() + ' ' + ['массу тела', 'высоту', 'потенциальную энергию'][rand] + ', ' +
                ['подвешенного на высоте $' + height + '$ м над поверхностью земли', 'на которой находится тело массой $' + mass + '$ кг', 'подвешенного тела на высоте $' + height + '$ м над поверхностью земли'][rand] + ', ' +
                ['если его потенциальная энергия равна ' + chislitlx(energy, 'джоуль', '$'), 'если его потенциальная энергия равна ' + chislitlx(energy, 'джоуль', '$'), 'если его масса равна $' + mass + '$ кг'][rand] + '. ' +
                'Ответ дайте в ' + ['килограммах', 'метрах', 'джоулях'][rand] + '.',
            answers: [mass, height, energy][rand],
            preference: preference,
        });
        NAtask.modifiers.allDecimalsToStandard();
    }, 2000);
})();
//zer00player
//https://oge.sdamgia.ru/problem?id=459974
