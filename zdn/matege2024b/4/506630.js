(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '506630';
		let preference1 = ['kilometer', 'meter', 'decimeter', 'centimeter'];
		let preference2 = ['decimeterStep', 'centimeterStep', 'millimeterStep'];
		let rand = getSelectedPreferenceFromList(key, preference1);
		let randDecor = getSelectedPreferenceFromList(key, preference2);

		let the_pedestrianOnRoad = sklonlxkand(decor.pedestrianOnRoad.iz());

		let metric = ['дм', 'см', 'мм'][randDecor];

		let l = sl(300, 900, 10); //шаг в миллиметрах
		let n = sl(1000, 10000, 100);

		let answer = l * n * 10 ** (-6) * [1, 1000, 10000, 100000][rand];
		NAtask.setTask({

			text: 'Зная длину своего шага, ' + the_pedestrianOnRoad.ie + ' может приближённо подсчитать пройденное им расстояние $s$ по формуле $s = nl$, ' +
				'где $n$ – число шагов, $l$ – длина шага. ' +
				'Какое расстояние прошёл ' + the_pedestrianOnRoad.ie + ', ' +
				'если $l = ' + l * [0.01, 0.1, 1][randDecor] + '$ ' + metric + ', $n = ' + n + '$? Ответ выразите в ' + ['километрах', 'метрах', 'дециметрах', 'сантиметрах'][rand] + '.',
			answers: answer,
			preference: [preference1, preference2],

		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=506630
